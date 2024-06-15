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

      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        let episodesArr = data.results;
        let nextUrl = data.info.next;

        while (nextUrl) {
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

  let content;

  if (loading) {
    content = (
      <div className={styles['loader-container']}>
        <LoadingSpinner />
      </div>
    );
  } else if (!loading && episodes) {
    content = (
      <div className={styles['episodes-container']}>
        {episodes.map((episode) => (
          <Card key={episode.id} className={styles['episode-card']}>
            <div className={styles['episode-name']}>{episode.name}</div>
            <div className={styles['episode-date']}>{episode.air_date}</div>
            <div className={styles['episode']}>{episode.episode}</div>
          </Card>
        ))}
      </div>
    );
  } else if (error) {
    content = <p className='error-message'>{error}</p>;
  }

  return content;
}

export default EpisodesPage;
