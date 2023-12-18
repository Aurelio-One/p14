import { NavLink, Link } from 'react-router-dom'
import logo from '../../assets/logo_wealth_health.jpg'
import './navbar.css'

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
        <Link to='/'>
          <img
            src={logo}
            width='100%'
            height='100%'
            alt='hrnet logo'
            className='navbar-logo-img'
          />
        </Link>
      </div>
      <ul className='navbar-content'>
        <li className='navbar-content-path'>
          <NavLink to='/'>Create employee</NavLink>
        </li>
        <li className='navbar-content-path'>
          <NavLink to='/employees'>Current employees</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
