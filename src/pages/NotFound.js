import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import image from '../assets/not-found.png';

function NotFound() {
  return (
    <div className={styles.container}>
        <img src={image} alt='Rick And Morty Image' />
        <div>
            <div className={styles.code}>404</div>
            <div className={styles['top-message']}>Ooops! Something is missing.</div>
            <div className={styles['footer-message']}>This page is missing or you assembled the link incorrectly.</div>
            <Link 
                to='/'
                className={styles.link}
            >Go To Home</Link>
        </div>
    </div>
  );
}

export default NotFound;