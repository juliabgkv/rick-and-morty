import { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ search }) {
    const [input, setInput] = useState('');

    function handleOnChange(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        search(input);
        setInput('');
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className={styles['search-form']}
        >
            <input 
                value={input} 
                onChange={handleOnChange} 
                placeholder='Type here to search character...'
                className={styles['search-input']}
            />
            <button className={styles['search-btn']}>Search</button>
        </form>
    );
}

export default SearchBar;