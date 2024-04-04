import TrafficLights from '@/components/TrafficLights/TrafficLights'
import { useEffect } from 'react'
import SideBar from './components/SideBar/SideBar'
import HomePage from './components/pages/HomePage/HomePage'
import PairGamePage from './components/pages/PairGamePage/PairGamePage'
import WordPackPage from './components/pages/WordPackPage/WordPackPage'
import { useAppSelector } from './hooks/redux'

const App = () => {
  const { wordPacks, allWords } = useAppSelector((state) => state.wordPackReducer)
  useEffect(() => {
    localStorage.setItem('wordPacks', JSON.stringify(wordPacks))
    localStorage.setItem('allWords', JSON.stringify(allWords))
  }, [wordPacks, allWords])
  return (
    <>
      <TrafficLights></TrafficLights>
      <SideBar></SideBar>
      <HomePage />
      {wordPacks.map((wordPack) => (
        <WordPackPage key={wordPack.id} wordPack={wordPack} />
      ))}
      <PairGamePage />
    </>
  )
}

export default App
