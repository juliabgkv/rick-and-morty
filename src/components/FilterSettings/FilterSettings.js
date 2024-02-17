import FilterSelection from './FilterSelection';
import styles from './FilterSettings.module.css';

function FilterSettings(props) {
    return (
        <>
            <div className={styles['filter-settings']}>
                {props.name &&
                    <div className={styles['name-filter-message']}>
                        Search results by name "{props.name}" 
                        <span 
                            className={'reset-filter-btn'}
                            onClick={() => props.resetFilters('name')}
                        ></span>
                    </div>
                }
                {props.gender && 
                    <FilterSelection
                        filterName='gender'
                        filterValue={props.gender}
                        resetFilters={props.resetFilters}
                    />
                }
                {props.species && 
                    <FilterSelection
                        filterName='species'
                        filterValue={props.species}
                        resetFilters={props.resetFilters}
                    />
                }
                {props.status && 
                    <FilterSelection
                        filterName='status'
                        filterValue={props.status}
                        resetFilters={props.resetFilters}
                    />
                }
            </div>
        </>
    );
}

export default FilterSettings;