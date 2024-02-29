import { Link } from 'react-router-dom';
import styles from './CharacterCard.module.css';
import GenderBlock from './UI/Blocks/GenderBlock';
import StatusBlock from './UI/Blocks/StatusBlock';

function CharacterCard({ character }) {
  return (
    <Link to={`/characters/${character.id}`} end="true">
        <div className={styles['character-card']}>
            <div className={styles.logo}>
                <img src={character.image} alt={`${character.name}`} className={styles['character-photo']} />
            </div>
            <div className={styles['character-card-info']}>
                <div className={styles['character-name']}>{character.name}</div>
                <div>{character.species}</div>
                <div className={styles['character-card-footer']}>
                  <GenderBlock gender={character.gender} />
                  <StatusBlock status={character.status} />
                </div>
            </div>
        </div>
    </Link>
  );
}

export default CharacterCard;