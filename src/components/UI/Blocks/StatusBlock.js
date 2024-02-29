import styles from './Block.module.css';
import deadIcon from '../../../assets/status-icons/tombstone.png';
import aliveIcon from '../../../assets/status-icons/heartbeat.png';
import questionMarkIcon from '../../../assets/question-mark.png';

function StatusBlock({ status }) {
  let statusIcon;

  if(status === 'Dead')
    statusIcon = deadIcon;
  else if(status === 'Alive')
    statusIcon = aliveIcon;
  else
    statusIcon = questionMarkIcon;

  return (
    <div className={styles.block}>
      <img src={statusIcon} alt={status} />
      <div>Status</div>
    </div>
  );
}

export default StatusBlock;