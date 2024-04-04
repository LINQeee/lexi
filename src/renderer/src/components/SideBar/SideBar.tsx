import { useAppSelector } from '@renderer/hooks/redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ActionBox from './ActionBox/ActionBox'
import classes from './SideBar.module.css'
import SideBarItem from './SideBarItem/SideBarItem'
import './Transitions.css'

const SideBar = () => {
  const { wordPacks } = useAppSelector((state) => state.wordPackReducer)

  return (
    <div className={classes.sideBar}>
      <ActionBox />
      <TransitionGroup className={`${classes.list} styled-scrollbar`}>
        {wordPacks.map((item) => (
          <CSSTransition key={item.id} timeout={200} classNames="item">
            <SideBarItem item={item} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

export default SideBar
