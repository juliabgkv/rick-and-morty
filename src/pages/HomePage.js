import { Link } from 'react-router-dom';
import gitIcon from '../assets/git.png';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.home}>
      <h1>This app created to explore Rick And Morty world!</h1>
      <Link to='/characters' className={styles['explore-btn']}>Start Explore</Link>
      <div className={styles['footer-info']}>
        <p>
          Powered by 
          <a 
            href='https://rickandmortyapi.com/' 
            target='_blank'
            className={styles.link}
          > The Rick and Morty API</a>
        </p>
        <p className={styles['created-info']}>
          Created by 
            <a 
              href='https://github.com/juliabgkv' 
              target='_blank' 
              className={styles.link}
            ><div className={styles['git-link']}><img src={gitIcon} alt='GitHub Icon' /> juliabgkv</div></a>
        </p>
      </div>
    </div>
  );
}

export default HomePage;