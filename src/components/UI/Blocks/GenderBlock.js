import styles from './Block.module.css';
import femaleIcon from '../../../assets/gender-icons/femenine.png';
import maleIcon from '../../../assets/gender-icons/male.png';
import genderlessIcon from '../../../assets/gender-icons/icons8-neutral.png';
import questionMarkIcon from '../../../assets/question-mark.png';

function GenderBlock({ gender }) {
  let genderIcon;

  if(gender === 'Female')
    genderIcon = femaleIcon;
  else if(gender === 'Male')
    genderIcon = maleIcon;
  else if(gender === 'Genderless')
    genderIcon = genderlessIcon;
  else
    genderIcon = questionMarkIcon;

  return (
    <div className={styles.block}>
      <img src={genderIcon} alt={gender} />
      <div>Gender</div>
    </div>
  );
}

export default GenderBlock;