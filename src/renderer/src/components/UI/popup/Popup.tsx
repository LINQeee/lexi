import { FC, ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import './Transitions.css'

export enum Transitions {
  SCALE = 'scale',
  SLIDE = 'slide'
}

interface PopupProps {
  children: ReactNode
  popupVisible: boolean
  transitionType?: Transitions
}

const Popup: FC<PopupProps> = ({ children, popupVisible, transitionType = Transitions.SCALE }) => {
  return (
    <CSSTransition in={popupVisible} timeout={250} classNames={transitionType} unmountOnExit>
      {children}
    </CSSTransition>
  )
}

export default Popup
