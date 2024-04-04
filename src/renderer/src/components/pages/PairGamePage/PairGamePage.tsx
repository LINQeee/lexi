import GameResults from '@renderer/components/UI/GameResultsPage/GameResults'
import PageLayout from '@renderer/components/layouts/PageLayout/PageLayout'
import { useAppSelector } from '@renderer/hooks/redux'
import { Pages } from '@renderer/store/reducers/WordPackSlice'
import { GameModes } from '@renderer/types/types'
import { useEffect, useState } from 'react'
import classes from './PairGamePage.module.css'

interface WordToGuess {
  word: string
  translation: string
}

export interface CompletedLevel extends WordToGuess {
  guessedCorrect: boolean
}

interface GameLevelData {
  word: WordToGuess
  choices: string[]
}
interface GameConfig {
  levelData: GameLevelData | null
  showAnswers: boolean
  completedLevels: CompletedLevel[]
  gameCompleted: boolean
}

const PairGamePage = () => {
  const { activeWordPackId, allWords, gameMode, currentPage } = useAppSelector(
    (state) => state.wordPackReducer
  )
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    completedLevels: [],
    gameCompleted: false,
    levelData: null,
    showAnswers: false
  })
  const words = activeWordPackId
    ? allWords.filter((word) => word.wordPackId === activeWordPackId)
    : allWords

  const restartLevel = () => {
    console.log('44 line')
    setGameConfig({
      completedLevels: [],
      gameCompleted: false,
      levelData: null,
      showAnswers: false
    })
    console.log('line 51')
    setTimeout(() => setGameConfig({ ...gameConfig, levelData: generateLevel() }), 500)
  }

  useEffect(() => {
    if (currentPage === Pages.PAIR_GAME) {
      restartLevel()
    }
  }, [currentPage])

  useEffect(() => {
    if (!gameConfig.levelData) return
    console.log('line 63')
    setGameConfig({
      ...gameConfig,
      completedLevels: [
        ...gameConfig.completedLevels,
        { ...gameConfig.levelData!.word, guessedCorrect: false }
      ]
    })
  }, [gameConfig.levelData])

  useEffect(() => console.log(gameConfig), [gameConfig])

  const generateLevel = (): GameLevelData => {
    if (gameConfig.completedLevels.length === 20) {
      setGameConfig({
        completedLevels: [],
        gameCompleted: false,
        levelData: null,
        showAnswers: false
      })
      restartLevel()
      return
    }
    const wordToGuess = getWordToGuess()
    return { word: wordToGuess, choices: getChoices(wordToGuess) }
  }

  const getWordToGuess = (): WordToGuess => {
    const allowedWords = words.filter(
      (word) =>
        !gameConfig.completedLevels.some(
          (level) => level.word === word.russian || level.word === word.english
        )
    )
    const randomWordPackWord = allowedWords[Math.floor(Math.random() * (allowedWords.length - 1))]
    const word =
      gameMode === GameModes.RUSSIAN_ENGLISH
        ? randomWordPackWord.russian
        : randomWordPackWord.english
    const translation =
      gameMode === GameModes.RUSSIAN_ENGLISH
        ? randomWordPackWord.english
        : randomWordPackWord.russian
    return { word, translation }
  }
  const addChoice = (choices: string[]) => {
    const getRandomChoice = () => words[Math.floor(Math.random() * (words.length - 1))]
    let randomChoice = getRandomChoice()
    let validatedChoice =
      gameMode === GameModes.RUSSIAN_ENGLISH ? randomChoice.english : randomChoice.russian
    while (choices.some((savedChoice) => savedChoice === validatedChoice)) {
      randomChoice = getRandomChoice()
      validatedChoice =
        gameMode === GameModes.RUSSIAN_ENGLISH ? randomChoice.english : randomChoice.russian
    }

    choices.push(validatedChoice)
  }

  const getChoices = (wordToGuess: WordToGuess) => {
    const choices: string[] = []
    const rightAnswerIndex = Math.floor(Math.random() * 5)
    for (let i = 0; i < 5; i++) {
      if (i !== rightAnswerIndex || choices.some((choice) => choice === wordToGuess.translation))
        addChoice(choices)
      else choices.push(wordToGuess.translation)
    }
    return choices
  }

  const generateClassName = (choice: string) => {
    if (!gameConfig.showAnswers) return
    return choice === gameConfig.levelData?.word.translation ? classes.correct : classes.wrong
  }
  const checkAnswers = (guessWord) => {
    setGameConfig({ ...gameConfig, showAnswers: true })
    setGameConfig((prevGameConfig) => ({ ...prevGameConfig, showAnswers: false }))
    const completed = gameConfig.completedLevels
    completed[completed.length - 1].guessedCorrect =
      gameConfig.levelData?.word.translation === guessWord || false
    setGameConfig((prevGameConfig) => ({ ...prevGameConfig, completedLevels: completed }))
    if (gameConfig.completedLevels.length < 20) {
      setGameConfig((prevGameConfig) => ({ ...prevGameConfig, levelData: generateLevel() }))
    } else {
      setGameConfig((prevGameConfig) => ({ ...prevGameConfig, gameCompleted: true }))
    }
  }

  if (words.length < 20) return null

  if (gameConfig.gameCompleted)
    return (
      <PageLayout pageHeader="Pair Game" pageName={Pages.PAIR_GAME}>
        <GameResults restart={restartLevel} completedLevels={gameConfig.completedLevels} />
      </PageLayout>
    )

  return (
    <PageLayout pageHeader="Pair Game" pageName={Pages.PAIR_GAME}>
      <div className={classes.pairGame}>
        <h3>{`Translate "${gameConfig.levelData?.word.word}"`}</h3>
        <span>{`${gameConfig.completedLevels.length} / 20`}</span>
        <ul>
          {gameConfig.levelData?.choices.map((choice) => (
            <li
              key={`pair-game-${choice}`}
              className={generateClassName(choice)}
              onClick={() => checkAnswers(choice)}
            >
              {choice}
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  )
}

export default PairGamePage
