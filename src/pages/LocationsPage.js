import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LocationCard from '../components/LocationCard';
import FadeIn from 'react-fade-in/lib/FadeIn';
import Pagination from 'react-js-pagination';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import API_URL from '../helpers/apiUrl';
import paginationStyles from './Pagination.module.css';

function LocationsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [locations, setLocations] = useState([]);
  const [pagesInfo, setPagesInfo] = useState({});
  const [page, setPage] = useState(Number(queryParams.get('page')) || 1);

  useEffect(() => {
    document.title = `Locations | Page ${page}`;
  }, []);

  useEffect((() => {
    document.title = `Locations | Page ${page}`;
    
    async function fetchLocations() {
      setLoading(true);
      const url = `${API_URL}location?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if(data.error) {
        setError(data.error);
        setLoading(false);
      } else if(data.results) {
        setPagesInfo({ count: data.info.count, pages: data.info.pages });
        setLocations(data.results);
        setLoading(false);
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
    <div className='wrapper'>
      {loading && <LoadingSpinner />}
      {!loading && locations && 
        <div style={{'maxWidth': '1265px', margin: 'auto'}}>
          <FadeIn className={'flex-container'}>
            {locations.map(location => (
              <LocationCard key={location.id} location={location}/>
            ))}
          </FadeIn>
          {pagesInfo.count &&  
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
        </div>
      }
      {error && <p className='error-message'>{error}</p>}
    </div>
  );
}

export default LocationsPage;