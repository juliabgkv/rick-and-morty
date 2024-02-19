import { useEffect, useState } from 'react';
import Card from '../components/Wrappers/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import API_URL from '../helpers/apiUrl';
import styles from '../pages/EpisodesPage.module.css';

function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Episodes';
    
    async function fetchEpisodes() {
      setLoading(true);
      let response = await fetch(`${API_URL}episode`);
      let data = await response.json();

      if(data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        let episodesArr = data.results;
        let nextUrl = data.info.next;
  
        while(nextUrl) {
          response = await fetch(nextUrl);
          data = await response.json();
  
          episodesArr = episodesArr.concat(data.results);
          nextUrl = data.info.next;
        }
        
        setEpisodes(episodesArr);
        setLoading(false);
      }
    }

    fetchEpisodes();
  }, []);

  return (
    <div className={'flex-container wrapper'}>
        {loading && <LoadingSpinner />}
        {!loading && episodes && episodes.map(episode => (
          <Card key={episode.id} className={styles['episode-card']}>
            <div className={styles['episode-name']}>{episode.name}</div>
            <div className={styles['episode-date']}>{episode.air_date}</div>
            <div className={styles['episode']}>{episode.episode}</div>
          </Card>
        ))}
        {error && <p className='error-message'>{error}</p>}
    </div>
  );
}

export default EpisodesPage;