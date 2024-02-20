import styles from './FilterSelection.module.css';

function FilterSelection(props) {
    return (
        <div className={styles['filter-selection']}>
            {`${props.filterName[0].toUpperCase() + props.filterName.substring(1)}: ${props.filterValue[0].toUpperCase() + props.filterValue.substring(1)}`}
            <span
                className={'reset-filter-btn'}
                onClick={() => props.resetFilters(props.filterName)}
            ></span>
        </div>
    );
}

export default FilterSelection;