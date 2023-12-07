import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './CharactersPage.module.css';

function CharactersPage() {
    const [characters, setCharacters] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);

    useEffect(() => {
        async function fetchCharacters() {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
            const data = await response.json();
            setCharacters(data.results);
            setPages(+data.info.pages);
        }
        fetchCharacters();
    }, [currentPage]);

    function handlePageClick(event) {
        setCurrentPage(event.selected + 1);
        window. scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <div>
            <div className={styles['items-container']}>
                {characters && characters.map(character => (
                    <div key={character.id} className={styles['character-card']}>
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
                ))}
            </div>
            <ReactPaginate 
                pageCount={pages}
                onPageChange={handlePageClick}
                className={styles.pagination}
                activeLinkClassName={styles['active-page']}
                previousClassName={styles['btn-prev-page']}
                nextClassName={styles['btn-next-page']}
            />
        </div>
    );
}

export default CharactersPage;