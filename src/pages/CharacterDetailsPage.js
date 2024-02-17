import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/UI/BackButton';
import styles from './CharacterDetailsPage.module.css';
import LoadingSpinner from '../components/UI/LoadingSpinner';

function CharacterDetailsPage() {
   const params = useParams();
   const [character, setCharacter] = useState();
   const [loading, setLoading] = useState(false);

   useEffect(() => {
        async function fetchCharacter() {
            setLoading(true);

            const response = await fetch(`https://rickandmortyapi.com/api/character/${params.characterId}`);
            const data = await response.json();

            setCharacter(data);
            document.title = data.name;
            
            setLoading(false);
        }
        fetchCharacter();
   }, []);

    return (
        <div className={styles['character-details']}>
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
                            <div>Status: {character.status}</div>
                            <div>Specie: {character.species}</div>
                            <div>Gender: {character.gender}</div>
                            <div>Origin: {character.origin.name}</div>
                            <div>Location: {character.location.name}</div>
                        </div>
                    </div>
                    <BackButton />
                </>
            }
        </div>
    );
}

export default CharacterDetailsPage;