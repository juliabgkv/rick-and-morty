import styles from './LoadingSpinner.module.css';

function LoadingSpinner() {
  return (
    <div className={styles['loader-container']}>
        <div className={styles['lds-spinner']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default LoadingSpinner;