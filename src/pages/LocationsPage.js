import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import paginationStyles from './Pagination.module.css';
import LocationCard from '../components/LocationCard';
import FadeIn from 'react-fade-in/lib/FadeIn';
import Pagination from 'react-js-pagination';
import styles from './LocationsPage.module.css';

function LocationsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [locations, setLocations] = useState([]);
  const [pagesInfo, setPagesInfo] = useState({});
  const [page, setPage] = useState(Number(queryParams.get('page')) || 1);

  useEffect((() => {
    async function fetchLocations() {
      const url = `https://rickandmortyapi.com/api/location?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if(data.error) {
        console.log(data.error);
      } else if(data.results) {
        setPagesInfo({ count: data.info.count, pages: data.info.pages });
        setLocations(data.results);
      }
    }

    fetchLocations();
  }), [page]);

  useEffect((() => {
    setPage(Number(queryParams.get('page')) || 1);
  }), [location.search]);

  function handlePageChange(num) {
    queryParams.set('page', num);
    navigate({ search: queryParams.toString() });

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (
    <>
      <FadeIn className={styles['locations-container']}>
        {locations && locations.map(location => (
          <LocationCard key={location.id} location={location}/>
        ))}
      </FadeIn>
      {pagesInfo.count > 0 && 
        <Pagination
          activePage={page}
          itemsCountPerPage={20}
          totalItemsCount={pagesInfo.count}
          pageRangeDisplayed={pagesInfo.pages}
          onChange={handlePageChange}
          hideDisabled={true}
          innerClass={paginationStyles.pagination}
          linkClass={paginationStyles.link}
          prevPageText={'< Prev'}
          nextPageText={'Next >'}
          firstPageText={'First page'}
          lastPageText={'Last page'}
          activeLinkClass={paginationStyles['active-page']}
          linkClassFirst={paginationStyles['btn-first-page']}
          linkClassLast={paginationStyles['btn-last-page']}
          linkClassPrev={paginationStyles['btn-prev-page']}
          linkClassNext={paginationStyles['btn-next-page']}
        />
      }
    </>
  );
}

export default LocationsPage;