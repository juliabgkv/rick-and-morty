import useToggle from '../../hooks/useToggle';
import FilterForm from './FilterForm';
import styles from './AccordionItem.module.css';

function AccordionItem({ filterName, options }) {
    const [active, toggleActive] = useToggle(false);

    return (
        <div className={`${styles['accordion-item']} ${active ? styles.active : ''}`}>
            <div 
                className={styles['accordion-item-btn']}
                onClick={toggleActive}
            >{filterName[0].toUpperCase() + filterName.substring(1)}</div>
            <div className={styles['accordion-item-body']}>
                <FilterForm 
                    filterName={filterName}
                    options={options}
                />
            </div>
        </div>
    );
}

export default AccordionItem;