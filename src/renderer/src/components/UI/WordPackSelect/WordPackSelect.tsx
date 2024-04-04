import { useAppDispatch, useAppSelector } from '@renderer/hooks/redux'
import { usePopup } from '@renderer/hooks/usePopup'
import { wordPackSlice } from '@renderer/store/reducers/WordPackSlice'
import { Word } from '@renderer/types/types'
import { FC, useEffect, useState } from 'react'
import Popup from '../popup/Popup'
import classes from './WordPackSelect.module.css'

interface WordPackSelectProps {
  width: string
  height: string
  defaultValuePackId?: number
  word: Word
}

const WordPackSelect: FC<WordPackSelectProps> = ({ height, width, word }) => {
  const { wordPacks } = useAppSelector((state) => state.wordPackReducer)
  const dispatch = useAppDispatch()
  const [wordPackId, setWordPackId] = useState<number | undefined>(word.wordPackId)
  const [popupVisible, openPopup, closePopup] = usePopup()

  const onChangePack = (wordPackId: number) => {
    dispatch(wordPackSlice.actions.changeWordPack({ wordId: word.id, wordPackId: wordPackId }))
    setWordPackId(wordPackId)
    closePopup()
  }

  useEffect(() => setWordPackId(word.wordPackId), [word.wordPackId])

  const getCurrentWordPackColor = () =>
    wordPackId ? wordPacks.find((pack) => pack.id === wordPackId)?.colorTag : '#6b6b6b'

  return (
    <div
      className={`${classes.select} ${popupVisible && classes.opened}`}
      style={{ width: width, height: height }}
      onClick={openPopup}
    >
      <div style={{ background: getCurrentWordPackColor() }}></div>
      <i className="fa-solid fa-chevron-down"></i>
      <Popup popupVisible={popupVisible}>
        <ul onClick={(e) => e.stopPropagation()}>
          {wordPacks.map((wordPack) => (
            <li key={wordPack.id} onClick={() => onChangePack(wordPack.id)}>
              <div style={{ background: wordPack.colorTag }}></div>
              <span>{wordPack.name}</span>
            </li>
          ))}
        </ul>
      </Popup>
    </div>
  )
}

export default WordPackSelect
