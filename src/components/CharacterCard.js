import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CharacterCard.module.css';

function CharacterCard({ character }) {
  return (
    <Link to={`/characters/${character.id}`} end="true">
        <div className={styles['character-card']}>
            <div className={styles.logo}>
                <img src={character.image} alt={`${character.name} Photo`}/>
            </div>
            <div className={styles['character-card-info']}>
                <div className={styles['character-name']}>{character.name}</div>
                <div>Gender: {character.gender}</div>
                <div>Status: {character.status}</div>
                <div>Specie: {character.species}</div>
            </div>
        </div>
    </Link>
  );
}

export default CharacterCard;