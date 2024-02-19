import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/rick-and-morty-31015.png';
import styles from './MainNavigation.module.css';

function MainNavigation() {
  const [isMenuClosed, setIsMenuClosed] = useState(false);

  function handleMenuClick() {
    setIsMenuClosed(st => !st);
  }

  return (
    <div className={styles['top-bar']}>
        <Link to='/'>
          <img 
            src={logo} 
            alt='Rick And Morty Logo'
            className={styles.logo}
          />
        </Link>

        <input 
          className={styles['checkbox-toggler']}
          type='checkbox'
          id='hamburger-menu-toggle'
          checked={isMenuClosed}
          onChange={handleMenuClick}
        />
        <label htmlFor='hamburger-menu-toggle' className={styles['menu-button-container']}>
            <div className={styles['menu-button']}></div>
        </label>

        <nav className={styles.navigation}>
            <NavLink 
              to='/'
              end='true'
              className={({ isActive }) => isActive ? 'active' : undefined }
              onClick={handleMenuClick}
            >Home</NavLink>
            <NavLink 
              to='/characters'
              end='true'
              className={({ isActive }) => isActive ? 'active' : undefined }
              onClick={handleMenuClick}
            >Characters</NavLink>
            <NavLink 
              to='/locations'
              end='true'
              className={({ isActive }) => isActive ? 'active' : undefined }
              onClick={handleMenuClick}
            >Locations</NavLink>
            <NavLink 
              to='/episodes'
              className={({ isActive }) => isActive ? 'active' : undefined }
              onClick={handleMenuClick}
            >Episodes</NavLink>
        </nav>
        
    </div>
  );
}

export default MainNavigation;