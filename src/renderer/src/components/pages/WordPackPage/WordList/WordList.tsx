import { Word } from '@renderer/types/types'
import { FC } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import WordListItem from './WorListItem/WordListItem'
import classes from './WordList.module.css'

interface WordListProps {
  wordPackList: Word[]
}

const WordList: FC<WordListProps> = ({ wordPackList }) => {
  return (
    <TransitionGroup className={classes.wordList}>
      <CSSTransition key={'table-header'} timeout={200} classNames={'item'}>
        <li>
          <span>Russian</span>
          <span>English</span>
        </li>
      </CSSTransition>
      {wordPackList.map((word) => (
        <CSSTransition key={word.id} timeout={200} classNames={'item'}>
          <WordListItem word={word} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default WordList
