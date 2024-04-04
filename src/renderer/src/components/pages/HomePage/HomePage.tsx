import GamesSection from '@renderer/components/GamesSection/GamesSection'
import PageLayout from '@renderer/components/layouts/PageLayout/PageLayout'
import { useAppSelector } from '@renderer/hooks/redux'
import { Pages } from '@renderer/store/reducers/WordPackSlice'
import AddWordForm from '../../AddWordForm/AddWordForm'
import WordList from '../WordPackPage/WordList/WordList'
import classes from './HomePage.module.css'

const HomePage = () => {
  const { allWords } = useAppSelector((state) => state.wordPackReducer)

  return (
    <PageLayout pageName={Pages.HOME} pageHeader="Home Page">
      <div className={classes.homePage}>
        <AddWordForm />
        <GamesSection />
        <WordList wordPackList={allWords} />
      </div>
    </PageLayout>
  )
}

export default HomePage
