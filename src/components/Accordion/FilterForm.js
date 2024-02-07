import React from 'react';
import { useContext } from 'react';
import FilterContext from '../../context/FilterContext';
import styles from './FilterForm.module.css';

function FilterForm({ filterName, options }) {
    const { filter, handleFilters } = useContext(FilterContext);
    
    function handleOptionChange(e) {
        handleFilters(filterName, e.target.value);
    }

    return (
        <form onSubmit = {e => e.preventDefault()}>
            {options.map(option => (
                <div key={option}>
                    <label>
                        <input 
                            type='radio' 
                            id={option} 
                            value={option} 
                            onChange={handleOptionChange}
                            checked={filter[filterName] == option}
                        />
                        {option[0].toUpperCase() + option.substring(1)}
                    </label>
                </div>
            ))}
        </form>
    );
}

export default FilterForm;