import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

function BackButton() {
    const navigate = useNavigate();
    return (
        <button 
            onClick={() => navigate(-1)}
            className={styles['back-btn']}
        >Back</button>
    );
}

export default BackButton;