import { useContext } from 'react';
import FilterContext from '../../context/FilterContext';
import styles from './FilterForm.module.css';

function FilterForm({ filterName, options }) {
    const { filter, handleFilters } = useContext(FilterContext);
    
    function handleOptionChange(e) {
        handleFilters(filterName, e.target.value);
    }

    return (
        <form 
            onSubmit = {e => e.preventDefault()} 
            className={styles.form}
        >
            {options.map(option => (
                <div 
                    key={option} 
                    className={`${styles.option} ${filter[filterName] === option ? styles['active-option'] : ''}`}
                >
                    <input 
                        type='radio' 
                        id={option + filterName} 
                        value={option} 
                        onChange={handleOptionChange}
                        checked={filter[filterName] === option}
                        className={styles['option-input']}
                    />
                    <label htmlFor={option + filterName} className={styles['option-label']}>
                        {option[0].toUpperCase() + option.substring(1)}
                    </label>
                </div>
            ))}
        </form>
    );
}

export default FilterForm;