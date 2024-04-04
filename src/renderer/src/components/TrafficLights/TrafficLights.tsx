import CloseIcon from '@/assets/svg/CloseIcon'
import MaximizeIcon from '@/assets/svg/MaximizeIcon'
import MinimizeIcon from '@/assets/svg/MinimizeIcon'
import classes from './TrafficLights.module.css'

const TrafficLights = () => {
  return (
    <>
      <div className={classes.trafficLights}>
        <button className={classes.closeButton} onClick={() => window.context.closeWindow()}>
          <CloseIcon></CloseIcon>
        </button>
        <button className={classes.minimizeButton} onClick={() => window.context.minimizeWindow()}>
          <MinimizeIcon></MinimizeIcon>
        </button>
        <button className={classes.maximizeButton}>
          <MaximizeIcon></MaximizeIcon>
        </button>
      </div>
      <div className={classes.draggable}></div>
    </>
  )
}
export default TrafficLights
