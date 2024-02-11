import { Link } from 'react-router-dom';
import Card from './Wrappers/Card';
import styles from './LocationCard.module.css';

function LocationCard({ location }) {
  return (
    <Link to={`/locations/${location.id}`} end='true'>
        <Card className={styles['location-card']}>
            <p className={styles['location-name']}>{location.name}</p>
            <div>
              <p className={styles['location-type']}>Type: {location.type}</p>
              <p className={styles['location-residents']}>Residents: {location.residents.length}</p>
            </div>
        </Card>
    </Link>
  );
}

export default LocationCard;