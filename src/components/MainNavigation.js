import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/rick-and-morty-31015.png';
import styles from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <div className={styles['top-bar']}>
        <Link to='/'>
          <img 
            src={logo} 
            alt='Rick And Morty Logo'
            className={styles.logo}
          />
        </Link>
        <nav className={styles.navigation}>
            <NavLink 
              to='/'
              end='true'
              className={({ isActive }) => isActive ? 'active' : undefined }
            >Home</NavLink>
            <NavLink 
              to='/characters'
              end='true'
              className={({ isActive }) => isActive ? 'active' : undefined }
            >Characters</NavLink>
            <NavLink 
              to='/locations'
              end='true'
              className={({ isActive }) => isActive ? 'active' : undefined }
            >Locations</NavLink>
            <NavLink 
              to='/episodes'
              className={({ isActive }) => isActive ? 'active' : undefined }
            >Episodes</NavLink>
        </nav>
    </div>
  );
}

export default MainNavigation;