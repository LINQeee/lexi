import WordPackSelect from '@renderer/components/UI/WordPackSelect/WordPackSelect'
import Popup from '@renderer/components/UI/popup/Popup'
import ConfirmPopup from '@renderer/components/UI/popupTemplates/confirmPopup/ConfirmPopup'
import { useAppDispatch } from '@renderer/hooks/redux'
import { usePopup } from '@renderer/hooks/usePopup'
import { wordPackSlice } from '@renderer/store/reducers/WordPackSlice'
import { Word } from '@renderer/types/types'
import { FC } from 'react'
import classes from './WordListItem.module.css'

interface WordListItemProps {
  word: Word
}

const WordListItem: FC<WordListItemProps> = ({ word }) => {
  const dispatch = useAppDispatch()
  const [popupVisible, openPopup, closePopup] = usePopup()

  return (
    <>
      <li className={classes.item}>
        <span>{word.russian}</span>
        <span>{word.english}</span>
        <button
          className={classes.deleteButton}
          onClick={() =>
            word.wordPackId ? openPopup() : dispatch(wordPackSlice.actions.removeWord(word.id))
          }
        >
          <i className="fa-thin fa-xmark"></i>
        </button>
        <WordPackSelect width="48px" height="23px" word={word} />
      </li>
      <Popup popupVisible={popupVisible && word.wordPackId !== undefined}>
        <ConfirmPopup
          header="Choose the option to delete a word."
          description="You can delete word only from word pack or delete it at all"
          onCancel={() => dispatch(wordPackSlice.actions.removeWord(word.id))}
          onConfirm={() => dispatch(wordPackSlice.actions.removeWordFromWordPack(word.id))}
          cancelLabel="Delete at all"
          confirmLabel="From pack only"
        />
      </Popup>
    </>
  )
}

export default WordListItem
