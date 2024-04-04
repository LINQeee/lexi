import { useAppDispatch, useAppSelector } from '@renderer/hooks/redux'
import { wordPackSlice } from '@renderer/store/reducers/WordPackSlice'
import { WordPack } from '@renderer/types/types'
import React, { FC, useState } from 'react'
import classes from './SideBarItem.module.css'

interface SideBarItemProps {
  item: WordPack
}

const SideBarItem: FC<SideBarItemProps> = ({ item }) => {
  const { activeWordPackId, allWords } = useAppSelector((state) => state.wordPackReducer)
  const dispatch = useAppDispatch()
  const [newWordPackName, setNewWordPackName] = useState<string>('')

  const className = [
    classes.item,
    activeWordPackId === item.id ? classes.active : undefined,
    item.isForm ? classes.form : undefined
  ].join(' ')

  const confirmForm = () => {
    if (!newWordPackName) return
    dispatch(wordPackSlice.actions.confirmWordPackForm(newWordPackName))
  }

  const closeForm = () => dispatch(wordPackSlice.actions.closeWordPackForm())

  const selectWordPack = () => {
    if (item.isForm) return
    dispatch(wordPackSlice.actions.selectWordPack(item.id))
  }

  const onChangeColor = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(
      wordPackSlice.actions.changeWordPackColor({
        wordPackId: item.id,
        newColor: event.currentTarget.value
      })
    )

  return (
    <li onClick={selectWordPack} className={className}>
      {item.isForm ? (
        <>
          <input
            spellCheck={false}
            maxLength={17}
            autoFocus
            required
            value={newWordPackName}
            onChange={(event) => setNewWordPackName(event.currentTarget.value)}
          />
          <button className={classes.confirmButton} onClick={confirmForm}>
            <i className="fa-thin fa-check"></i>
          </button>
          <button className={classes.closeButton} onClick={closeForm}>
            <i className="fa-thin fa-xmark"></i>
          </button>
        </>
      ) : (
        <>
          <span>{item.name}</span>
          <span>Words Count: {allWords.filter((word) => word.wordPackId === item.id).length}</span>
          <div className={classes.colorInput}>
            <input type="color" value={item.colorTag} onChange={onChangeColor} />
            <div style={{ background: item.colorTag }}></div>
          </div>
        </>
      )}
    </li>
  )
}

export default SideBarItem
