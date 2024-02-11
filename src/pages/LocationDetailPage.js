import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CharactersList from '../components/CharactersList';
import styles from './LocationDetailPage.module.css';
import BackButton from '../components/UI/BackButton';

function LocationDetailPage() {
    const params = useParams();
    const [locationInfo, setLocationInfo] = useState({});
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        async function fetchLocationDetails() {
            const response = await fetch(`https://rickandmortyapi.com/api/location/${params.locationId}`);
            const data = await response.json();

            setLocationInfo({ 
                name: data.name, 
                type: data.type, 
                dimension: data.dimension,
                residentsCount: data.residents.length
            });

            let residentsData = await Promise.all(
                data.residents.map(residentUrl => {
                    return fetch(residentUrl).then(res => res.json());
                })
            )
            setResidents(residentsData);
        }

        fetchLocationDetails();
    }, []);

    return (
        <div className={styles.container}>
            <BackButton />
            <div className={styles['location-main-info']}>
                <div className={styles['location-name']}>{locationInfo.name}</div>
                <div className={styles['location-type']}>Type: <span className={styles.accented}>{locationInfo.type}</span></div>
                <div className={styles['location-dimension']}>Dimension: <span className={styles.accented}>{locationInfo.dimension}</span></div>
            </div>
            <CharactersList 
                characters={residents}
                totalItems={0}
            />
        </div>
    );
}

export default LocationDetailPage;