import GamesSection from '@renderer/components/GamesSection/GamesSection'
import PageLayout from '@renderer/components/layouts/PageLayout/PageLayout'
import { useAppSelector } from '@renderer/hooks/redux'
import { Pages } from '@renderer/store/reducers/WordPackSlice'
import { WordPack } from '@renderer/types/types'
import { FC, useState } from 'react'
import AddWordForm from '../../AddWordForm/AddWordForm'
import WordList from './WordList/WordList'
import classes from './WordPackPage.module.css'

interface WordPackPageProps {
  wordPack: WordPack
}

const WordPackPage: FC<WordPackPageProps> = ({ wordPack }) => {
  const { allWords } = useAppSelector((state) => state.wordPackReducer)
  const [pageHeader, setPageHeader] = useState('')
  if (wordPack && wordPack.name !== pageHeader) setPageHeader(wordPack.name)

  return (
    <PageLayout pageName={Pages.WORD_PACK} wordPackId={wordPack.id} pageHeader={pageHeader}>
      <div className={classes.wordPackPage}>
        <AddWordForm />
        <GamesSection />
        <WordList wordPackList={allWords.filter((word) => word.wordPackId === wordPack.id)} />
      </div>
    </PageLayout>
  )
}

export default WordPackPage
