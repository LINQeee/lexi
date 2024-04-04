import WarningTriangle from '@renderer/assets/svg/WarningTriangle'
import { FC } from 'react'
import classes from './ConfirmPopup.module.css'
interface ConfirmPopupProps {
  header: string
  description: string
  onCancel: () => void
  onConfirm: () => void
  cancelLabel?: string
  confirmLabel?: string
}

const ConfirmPopup: FC<ConfirmPopupProps> = ({
  header,
  description,
  onCancel,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'OK'
}) => {
  return (
    <div className={classes.confirmPopup} onClick={(event) => event.stopPropagation()}>
      <WarningTriangle />
      <h1>{header}</h1>
      <span>{description}</span>
      <div>
        <button onClick={onCancel}>{cancelLabel}</button>
        <button onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </div>
  )
}

export default ConfirmPopup
