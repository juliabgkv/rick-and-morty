import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Pagination from "react-js-pagination";
import SearchBar from '../components/SearchBar';
import styles from './CharactersPage.module.css';

function CharactersPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const queryPage = Number(queryParams.get('page')) || 1;
    const queryName = queryParams.get('name') || '';

    const [characters, setCharacters] = useState();
    const [pagesInfo, setPagesInfo] = useState({ pages: 1, count: 0 });
    const [filter, setFilter] = useState({ 
        currentPage: queryPage, 
        name: queryName,
        gender: '',
        status: '',
        species: ''
    });

    useEffect(() => {
        setFilter({ 
            currentPage: queryPage, 
            name: queryName ? queryName : '',
            gender: '',
            status: '',
            species: ''
        });
    }, [location.search]);

    useEffect(() => {
        document.title = `Rick And Morty | Characters | Page ${filter.currentPage}`;

        async function fetchCharacters() {
            let url = `https://rickandmortyapi.com/api/character/${location.search}`;
            const response = await fetch(url);

            if(response.ok) {
                const data = await response.json();

                setCharacters(data.results);
                setPagesInfo({ 
                    pages: +data.info.pages, 
                    count: +data.info.count 
                });
            } else if(response.error) {
                setPagesInfo({ pages: 1, count: 0 });
                setCharacters(null);
                console.log(response.error);
            }
        }

        fetchCharacters();
    }, [filter]);

    function handlePageChange(pageNumber) {
        setFilter(prevState => {
            return { ...prevState, currentPage: pageNumber };
        });

        queryParams.set('page', pageNumber);
        navigate({ search: queryParams.toString() });

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    function handleSearch(input) {
        setFilter(prevState => {
            return { ...prevState, name: input, currentPage: 1 };
        });

        queryParams.set('page', 1);
        queryParams.set('name', input);
        navigate({ search: queryParams.toString() });
    }

    return (
        <div>
            <SearchBar search={handleSearch} />

            {pagesInfo.count ? 
                <div className={styles['search-result-message']}>Found {pagesInfo.count} characters</div> :
                <div className={styles['search-result-message']}>No results...</div>
            }
            
            <div className={styles['items-container']}>
                {characters && characters.map(character => (
                    <Link to={`/characters/${character.id}`} key={character.id} end="true">
                        <div className={styles['character-card']}>
                            <div className={styles.logo}>
                                <img src={character.image} alt={`${character.name} Photo`}/>
                            </div>
                            <div className={styles['character-card-info']}>
                                <div className={styles['character-name']}>{character.name}</div>
                                <div>Gender: {character.gender}</div>
                                <div>Status: {character.status}</div>
                                <div>Specie: {character.species}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {pagesInfo.pages > 1 && 
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
    );
}

export default CharactersPage;