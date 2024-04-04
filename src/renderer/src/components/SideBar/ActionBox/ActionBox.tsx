import ActionButton from '@renderer/components/UI/buttons/ActionButton/ActionButton'
import Popup from '@renderer/components/UI/popup/Popup'
import ConfirmPopup from '@renderer/components/UI/popupTemplates/confirmPopup/ConfirmPopup'
import { useAppDispatch, useAppSelector } from '@renderer/hooks/redux'
import { usePopup } from '@renderer/hooks/usePopup'
import { wordPackSlice } from '@renderer/store/reducers/WordPackSlice'
import classes from './ActionBox.module.css'

const ActionBox = () => {
  const [popupVisible, openPopup, closePopup] = usePopup()
  const { wordPacks, activeWordPackId } = useAppSelector((state) => state.wordPackReducer)
  const dispatch = useAppDispatch()

  const returnToHome = () => {
    dispatch(wordPackSlice.actions.unselectWordPack())
  }

  const deleteWordPack = () => {
    dispatch(wordPackSlice.actions.deleteSelectedWordPack())
    closePopup()
  }

  const getCurrentWordPackName = () => {
    return wordPacks.find((wordPack) => wordPack.id === activeWordPackId)?.name
  }

  const openDeleteConfirmPopup = () => {
    if (!activeWordPackId) return
    openPopup()
  }

  return (
    <div className={classes.actionBox}>
      <div className={classes.leftSide}>
        <ActionButton iconClass="fa-light fa-house" onClick={returnToHome} />
        <ActionButton
          iconClass="fa-thin fa-plus"
          onClick={() => dispatch(wordPackSlice.actions.openWordPackForm())}
        />
      </div>
      <ActionButton iconClass="fa-thin fa-trash-can" onClick={openDeleteConfirmPopup} />
      <Popup popupVisible={popupVisible}>
        <ConfirmPopup
          header={`Are you sure you want to delete "${getCurrentWordPackName()}"?`}
          description="This item will be deleted immediately. You can't undo this action."
          onConfirm={deleteWordPack}
          onCancel={closePopup}
        />
      </Popup>
    </div>
  )
}

export default ActionBox
