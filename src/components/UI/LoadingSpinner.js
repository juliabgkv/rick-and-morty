import styles from './LoadingSpinner.module.css';

function LoadingSpinner() {
  return (
    <div className={styles['loader-container']}>
        <span className={styles.loader}></span>
    </div>
  );
}

export default LoadingSpinner;