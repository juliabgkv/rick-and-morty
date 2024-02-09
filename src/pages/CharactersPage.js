import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from "react-js-pagination";
import SearchBar from '../components/SearchBar';
import styles from './CharactersPage.module.css';
import CharacterCard from '../components/CharacterCard';
import Accordion from '../components/Accordion/Accordion';
import FadeIn from 'react-fade-in/lib/FadeIn';
import FilterContext from '../context/FilterContext';

function CharactersPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const [ filter, setFilter ] = useState({});
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState();
    const [pagesInfo, setPagesInfo] = useState({ pages: 1, count: 0 });

    useEffect(() => {
        setFilter({ 
            currentPage: Number(queryParams.get('page')) || 1, 
            name: queryParams.get('name') || '',
            gender: queryParams.get('gender') || '',
            status: queryParams.get('status') || '',
            species: queryParams.get('species') || ''
        });
    }, [location.search]);

    useEffect(() => {
        setLoading(true);
        setCharacters(null);
        setPagesInfo({ pages: 1, count: 0 });

        document.title = `Rick And Morty | Characters | Page ${filter.currentPage}`;

        async function fetchCharacters() {
            let url = `https://rickandmortyapi.com/api/character/${location.search}`;
            const response = await fetch(url);
            const data = await response.json();

            if(data.error) {
                setPagesInfo({ pages: 1, count: 0 });
                setCharacters(null);
            } else if(data.results) {
                setCharacters(data.results);
                setPagesInfo({ 
                    pages: +data.info.pages, 
                    count: +data.info.count 
                });
            }
            setLoading(false);
        }

        fetchCharacters();
    }, [filter]);

    function handlePageChange(pageNumber) {
        queryParams.set('page', pageNumber);
        navigate({ search: queryParams.toString() });

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    function handleSearch(input) {
        queryParams.set('page', 1);
        queryParams.set('name', input);
        navigate({ search: queryParams.toString() });
    }

    function handleFilters(filterName, value) {
        queryParams.set(filterName, value);
        queryParams.set('page', 1);
        navigate({ search: queryParams.toString() });
    }

    function handleResetFilters() {
        queryParams.delete('gender');
        queryParams.delete('status');
        queryParams.delete('species');
        queryParams.set('page', 1);
        navigate({ search: queryParams.toString() });
    }

    return (
        <FilterContext.Provider value={{ filter, handleFilters }}>
            <SearchBar search={handleSearch} />

            {!loading && pagesInfo.count && <div className={styles['search-result-message']}>Found {pagesInfo.count} characters</div>}
            {!loading && !pagesInfo.count && <div className={styles['search-result-message']}>There is nothing here</div>}

            <div className={styles['main-content']}>
                <Accordion 
                    resetFilters={handleResetFilters}
                    className={styles['left-side']}
                />
                <div className={styles['right-side']}>
                    {loading ? 
                        <span className={styles.loader}></span> :
                    ''}

                    <FadeIn className={styles['items-container']}>
                            {characters && characters.map(character => (
                                <CharacterCard 
                                    character={character} 
                                    key={character.id}
                                />
                            ))}
                    </FadeIn>

                    {pagesInfo.count > 0 && 
                        <Pagination 
                            activePage={filter.currentPage}
                            itemsCountPerPage={20}
                            totalItemsCount={pagesInfo.count}
                            pageRangeDisplayed={7}
                            onChange={handlePageChange}
                            hideDisabled={true}
                            prevPageText={'< Prev'}
                            nextPageText={'Next >'}
                            firstPageText={'First page'}
                            lastPageText={'Last page'}
                            innerClass={styles.pagination}
                            linkClass={styles.link}
                            activeLinkClass={styles['active-page']}
                            linkClassFirst={styles['btn-first-page']}
                            linkClassLast={styles['btn-last-page']}
                            linkClassPrev={styles['btn-prev-page']}
                            linkClassNext={styles['btn-next-page']}
                        />
                    }
                </div>
            </div>
        </FilterContext.Provider>
    );
}

export default CharactersPage;