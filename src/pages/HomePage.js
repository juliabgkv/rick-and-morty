import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gitIcon from '../assets/git.png';
import styles from './HomePage.module.css';

function HomePage() {
  useEffect(() => {
    document.title = 'Rick And Morty';
  }, []);

  return (
    <div className={`${styles.home} wrapper`}>
      <h1>This app created to explore Rick And Morty world!</h1>
      <Link to='/characters' className={styles['explore-btn']}>Start Explore</Link>
      <div className={styles['footer-info']}>
        <div>
          Powered by 
          <a 
            href='https://rickandmortyapi.com/' 
            target='_blank'
            rel="noreferrer"
            className={styles.link}
          > The Rick and Morty API</a>
        </div>
        <div className={styles['created-info']}>
          Created by 
            <a 
              href='https://github.com/juliabgkv' 
              target='_blank' 
              rel="noreferrer"
              className={styles.link}
            ><div className={styles['git-link']}><img src={gitIcon} alt='GitHub Icon' /> juliabgkv</div></a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;