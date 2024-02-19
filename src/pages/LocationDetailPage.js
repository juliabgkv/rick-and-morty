import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CharactersList from '../components/CharactersList';
import BackButton from '../components/UI/BackButton';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import API_URL from '../helpers/apiUrl';
import styles from './LocationDetailPage.module.css';

function LocationDetailPage() {
    const params = useParams();
    const [locationInfo, setLocationInfo] = useState(null);
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingResidents, setLoadingresidents] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = 'Location';
        async function fetchLocationDetails() {
            setLoading(true);
            setLoadingresidents(true);
            const response = await fetch(`${API_URL}location/${params.locationId}`);
            const data = await response.json();

            if(data.error) {
                console.error(data.error);
                setLoading(false);
                setLoadingresidents(false);
                setError(data.error);
            } else {
                setLocationInfo({ 
                    name: data.name, 
                    type: data.type, 
                    dimension: data.dimension,
                    residentsCount: data.residents.length
                });
                document.title = data.name;
                setLoading(false);
                
                let residentsData = await Promise.all(
                    data.residents.map(residentUrl => {
                        return fetch(residentUrl).then(res => res.json());
                    })
                );
                setResidents(residentsData);
                setLoadingresidents(false);
            }
        }

        fetchLocationDetails();
    }, []);

    return (
        <div className='wrapper'>
            {loading && <LoadingSpinner />}
            {!loading && locationInfo &&
                <div className={styles.container}>
                    <div className={styles['location-main-info']}>
                        <div className={styles['location-name']}>
                            {locationInfo.name}
                        </div>
                        <div className={styles['location-type']}>
                            Type: <span className={styles.accented}>{locationInfo.type}</span>
                        </div>
                        <div className={styles['location-dimension']}>
                            Dimension: <span className={styles.accented}>{locationInfo.dimension}</span>
                        </div>
                        
                    <BackButton />
                    </div>
                    {loadingResidents && <LoadingSpinner />}
                    {!loadingResidents && residents && 
                        <CharactersList 
                            characters={residents}
                            totalItems={0}
                        />
                    }
                </div>
            }
            {error && <p className='error-message'>{error}</p>}
        </div>
    );
}

export default LocationDetailPage;