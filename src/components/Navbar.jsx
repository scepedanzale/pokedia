import { Link, useLocation } from 'react-router-dom'
import { TbPokeball } from "react-icons/tb";
import { BsController, BsDisc, BsGeoAlt, BsHouse, BsListUl, BsStar } from "react-icons/bs";


export default function Navbar() {

  const location = useLocation();

  return (
    <nav>
      <Link className='navbar-brand' to="/">
        <img id='logo' src='./imgs/logo.png' />
      </Link>
      <label htmlFor='toggle-menu'><TbPokeball /></label>
      <input type="checkbox" id='toggle-menu' />
      <ul>
        <li>
          <Link to="/" className={location.pathname == '/' && 'active'}>
            <BsHouse />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/types" className={location.pathname.includes('types') && 'active'}>
            <BsListUl />
            <span>Types</span></Link>
        </li>
        <li>
          <Link to="/moves" className={location.pathname.includes('moves') && 'active'}>
            <BsDisc/>
            <span>Moves</span></Link>
        </li>
        <li>
          <Link to="/regions" className={location.pathname.includes('regions') && 'active'}>
            <BsGeoAlt />
            <span>Regions</span></Link>
        </li>
        <li>
          <Link to="/versions" className={location.pathname.includes('versions') && 'active'}>
            <BsController />
            <span>Versions</span></Link>
        </li>


        <li className='button'>
          <Link to="/favourites" className={location.pathname.includes('favourites') && 'active'}>
            <BsStar />
            <span>Favourites</span></Link>
        </li>
      </ul>
    </nav>
  )
}
