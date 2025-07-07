import { Link } from 'react-router-dom'
import { TbPokeball } from "react-icons/tb";
import logo from '../imgs/logo.png'

export default function Navbar() {

  return (
    <nav>
      <Link className='navbar-brand' to="/">
        <img id='logo' src={logo} />
      </Link>
      <label htmlFor='toggle-menu'><TbPokeball /></label>
      <input type="checkbox" id='toggle-menu' />
      <ul>
        <li>
          <Link to="/"><img src="/icons/home.png" alt="" /><span>Home</span></Link>
        </li>
        <li>
          <Link to="/types"><img src="/icons/list.png" alt="" /><span>Types</span></Link>
        </li>
        <li>
          <Link to="/"><img src="/icons/pugno.png" alt="" /><span>Moves</span></Link>
        </li>
        <li>
          <Link to="/regions"><img src="/icons/region.png" alt="" /><span>Regions</span></Link>
        </li>
        <li>
          <Link to="/"><img src="/icons/age.png" alt="" /><span>Generations</span></Link>
        </li>
        <li>
          <Link to="/"><img src="/icons/games.png" alt="" /><span>Games</span></Link>
        </li>
        <li className='button'>
          <Link to="/favourites"><img src="/icons/star.png" alt="" /><span>Favourites</span></Link>
        </li>
      </ul>
    </nav>
  )
}
