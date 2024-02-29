import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/UI/BackButton';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import GenderBlock from '../components/UI/Blocks/GenderBlock';
import StatusBlock from '../components/UI/Blocks/StatusBlock';
import API_URL from '../helpers/apiUrl';
import styles from './CharacterDetailsPage.module.css';

function CharacterDetailsPage() {
   const params = useParams();
   const [character, setCharacter] = useState();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   useEffect(() => {
        document.title = 'Character';
        async function fetchCharacter() {
            setLoading(true);

            const response = await fetch(`${API_URL}character/${params.characterId}`);
            const data = await response.json();

            if(data.error) {
                setError(data.error);
                setLoading(false);
            } else {
                setCharacter(data);
                document.title = data.name;
                
                setLoading(false);
            }
        }
        fetchCharacter();
   }, []);

    return (
        <div className={`${styles['character-details']} wrapper`}>
            {loading && <LoadingSpinner />}
            {character && 
                <>
                    <div className={styles['character-details-card']}>
                        <img 
                            src={character.image} 
                            alt={character.name} 
                            className={styles['character-img']}
                        />
                        <div className={styles['character-info']}>
                            <div className={styles['character-name']}>{character.name}</div>
                            <div className={styles['character-specie']}>({character.species})</div>
                            <div><span className={styles['secondary-text']}>Location:</span> {character.location.name}</div>
                            <div><span className={styles['secondary-text']}>Origin:</span> {character.origin.name}</div>
                            <div className={styles['info-flex-wrapper']}>
                                <GenderBlock gender={character.gender} />
                                <StatusBlock status={character.status} />
                            </div>
                        </div>
                    </div>
                    <BackButton />
                </>
            }
            {error && <p className='error-message'>{error}</p>}
        </div>
    );
}

export default CharacterDetailsPage;