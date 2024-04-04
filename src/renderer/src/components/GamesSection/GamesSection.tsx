import classes from './GamesSection.module.css'
import PairGameCard from './PairGameCard/PairGameCard'

const GamesSection = () => {
  return (
    <section className={classes.section}>
      <PairGameCard />
    </section>
  )
}

export default GamesSection
