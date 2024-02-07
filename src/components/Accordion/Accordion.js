import React from 'react';
import AccordionItem from './AccordionItem';
import FILTERS from '../../helpers/filters';
import styles from './Accordion.module.css';

function Accordion({ resetFilters }) {
    function handleResetFilters() {
        resetFilters();
    }

    return (
        <div className={styles.accordion}>
            <div>
                <h4>Filters</h4>
                <button onClick={handleResetFilters}>Reset filters</button>
            </div>
            {FILTERS.map(f => (
                <AccordionItem 
                    key={f.id}
                    filterName={f.filterName}
                    options={f.options}
                />
            ))}
        </div>
    );
}

export default Accordion;