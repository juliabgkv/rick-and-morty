import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/UI/SearchBar';
import Accordion from '../components/Accordion/Accordion';
import FilterContext from '../context/FilterContext';
import CharactersList from '../components/CharactersList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import FilterSettings from '../components/FilterSettings/FilterSettings';
import API_URL from '../helpers/apiUrl';
import styles from './CharactersPage.module.css';

function CharactersPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const [pagesInfo, setPagesInfo] = useState({ pages: 1, count: 0 });

    const filter = {
        currentPage: Number(searchParams.get('page')) || 1, 
        name: searchParams.get('name') || '',
        gender: searchParams.get('gender') || '',
        status: searchParams.get('status') || '',
        species: searchParams.get('species') || ''
    };

    useEffect(() => {
        setLoading(true);
        setCharacters(null);
        setPagesInfo({ pages: 1, count: 0 });

        document.title = `Characters | Page ${filter.currentPage}`;

        async function fetchCharacters() {
            const url = `${API_URL}character/?${searchParams.toString()}`;
            const response = await fetch(url);
            const data = await response.json();

            if(data.error) {
                console.error(data.error);
                setLoading(false);
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
    }, [searchParams]);

    function handlePageChange(pageNumber) {
        setSearchParams(params => {
            params.set('page', pageNumber);

            return params;
        });

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    function handleSearch(input) {
        setSearchParams({
            page: 1,
            name: input
        });
    }

    function handleFilters(filterName, value) {
        setSearchParams(params => {
            params.set(filterName, value);
            params.set('page', 1);

            return params;
        });
    }

    function handleResetFilters(paramName) {
        setSearchParams(params => {
            if (paramName) {
                params.delete(paramName);
            } else {
                params.delete('gender');
                params.delete('status');
                params.delete('species');
            }
            params.set('page', 1);

            return params;
        });
    }

    return (
        <FilterContext.Provider value={{ filter, handleFilters }}>
            <div className='wrapper'>
                <SearchBar search={handleSearch} />

                {!loading && (filter.name || filter.gender || filter.species || filter.status) &&
                    <FilterSettings 
                        name={filter.name}
                        gender={filter.gender}
                        species={filter.species}
                        status={filter.status}
                        resetFilters={handleResetFilters}
                    />
                }

                {!loading && (pagesInfo.count ? 
                    <div className={styles['search-result-message']}>
                        Found {pagesInfo.count} characters
                    </div>
                    :
                    <div className={styles['search-result-message']}>
                        There is nothing here
                    </div>
                )}

                <div className={styles['main-content']}>
                    <Accordion resetFilters={handleResetFilters} />
                    <div className={styles['right-side']}>
                        {loading && <LoadingSpinner />}
                        <CharactersList 
                            characters={characters}
                            page={filter.currentPage}
                            totalItems={pagesInfo.count}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </FilterContext.Provider>
    );
}

export default CharactersPage;