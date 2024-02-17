import { useEffect, useState } from 'react';
import styles from '../pages/EpisodesPage.module.css';
import Card from '../components/Wrappers/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';

function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchEpisodes() {
      setLoading(true);
      let response = await fetch('https://rickandmortyapi.com/api/episode');
      let data = await response.json();

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

    fetchEpisodes();
  }, []);

  return (
    <div className={'flex-container'}>
        {loading && <LoadingSpinner />}
        {!loading && episodes && episodes.map(episode => (
          <Card key={episode.id} className={styles['episode-card']}>
            <div className={styles['episode-name']}>{episode.name}</div>
            <div className={styles['episode-date']}>{episode.air_date}</div>
            <div className={styles['episode']}>{episode.episode}</div>
          </Card>
        ))}
    </div>
  );
}

export default EpisodesPage;