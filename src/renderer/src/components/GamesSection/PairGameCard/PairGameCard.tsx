import GameCard from '@renderer/components/UI/GameCard/GameCard'
import { useAppDispatch } from '@renderer/hooks/redux'
import { wordPackSlice } from '@renderer/store/reducers/WordPackSlice'

const PairGameCard = () => {
  const dispatch = useAppDispatch()

  return (
    <GameCard
      name="Pair Game"
      description="Try to guess a translation of a random word from your list."
      onPlay={(gameMode) => dispatch(wordPackSlice.actions.startPairGame(gameMode))}
    />
  )
}

export default PairGameCard
