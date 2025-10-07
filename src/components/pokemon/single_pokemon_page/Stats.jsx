import { calculateStatsPercentage } from "../../../utils/pokemon";

export default function Stats({ currentPokemon }) {
  return (
    <section id='stats'>
      {currentPokemon.stats && currentPokemon.stats.map((stat, index) => (
        <div key={index}>
          <p>{stat.stat.name}</p>
          <div className='progress' title={stat.base_stat + '/255'}>
            <div className={`progress-bar ${currentPokemon?.types[0].type.name}`} style={{ 'width': calculateStatsPercentage(stat.base_stat) + '%' }}>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
