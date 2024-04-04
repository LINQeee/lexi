import CircleProgress from '@renderer/assets/svg/CircleProgress'
import { CompletedLevel } from '@renderer/components/pages/PairGamePage/PairGamePage'
import { FC } from 'react'
import classes from './GameResults.module.css'

interface GameResultsProps {
  completedLevels: CompletedLevel[]
  restart: () => void
}

const GameResults: FC<GameResultsProps> = ({ completedLevels, restart }) => {
  const correctCount = completedLevels.filter((level) => level.guessedCorrect).length
  const percent = (correctCount / 20) * 100

  return (
    <div className={classes.results}>
      <div
        data-pct={percent}
        data-correct-count={correctCount}
        style={{ strokeDashoffset: ((100 - percent) / 100) * Math.PI * 180 }}
      >
        <CircleProgress />
      </div>
      <button onClick={restart}>Restart</button>
    </div>
  )
}

export default GameResults
