import pokeball_loader from '../imgs/pokeball_loader.png';

export default function Loader() {
  return (
    <div className='pokeball-loader-wrapper'>
      <img id='pokeball-loader' src={pokeball_loader} />
    </div>
  )
}
