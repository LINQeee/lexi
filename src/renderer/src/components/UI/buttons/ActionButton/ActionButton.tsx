import { FC } from 'react'
import classes from './ActionButton.module.css'

interface ActionButtonProps {
  iconClass: string
  onClick: () => void
}

const ActionButton: FC<ActionButtonProps> = ({ iconClass, onClick }) => {
  return (
    <button className={classes.actionButton} onClick={onClick}>
      <i className={iconClass}></i>
    </button>
  )
}

export default ActionButton
