import { useAppSelector } from '@renderer/hooks/redux'
import { GameModes, toGameModes } from '@renderer/types/types'
import { generateId } from '@renderer/utils/Utils'
import { FC, useState } from 'react'
import classes from './GameCard.module.css'

interface GameCardProps {
  name: string
  description: string
  onPlay: (mode: GameModes) => void
}

const GameCard: FC<GameCardProps> = ({ name, description, onPlay }) => {
  const englishModeId = generateId()
  const russianMode = generateId()

  const { allWords, activeWordPackId } = useAppSelector((state) => state.wordPackReducer)
  const filteredWords = activeWordPackId
    ? allWords.filter((word) => word.wordPackId === activeWordPackId)
    : allWords
  const [gameMode, setGameMode] = useState<GameModes>(GameModes.RUSSIAN_ENGLISH)

  return (
    <div className={classes.card}>
      <h4>{name}</h4>
      <span>{description}</span>
      <div>
        <div>
          <input
            id={englishModeId.toString()}
            type="radio"
            name="pair-game-mode"
            value={GameModes.RUSSIAN_ENGLISH}
            onChange={(event) => setGameMode(toGameModes(event.target.value))}
            defaultChecked
          />
          <label htmlFor={englishModeId.toString()}>English - Russian</label>
        </div>
        <div>
          <input
            id={russianMode.toString()}
            type="radio"
            name="pair-game-mode"
            value={GameModes.ENGLISH_RUSSIAN}
            onChange={(event) => setGameMode(toGameModes(event.target.value))}
          />
          <label htmlFor={russianMode.toString()}>Russian - English</label>
        </div>
      </div>
      <button disabled={filteredWords.length < 20} onClick={() => onPlay(gameMode)}>
        Play
      </button>
    </div>
  )
}

export default GameCard
