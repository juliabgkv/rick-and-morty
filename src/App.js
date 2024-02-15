import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import CharactersPage from './pages/CharactersPage';
import LocationsPage from './pages/LocationsPage';
import EpisodesPage from './pages/EpisodesPage';
import CharacterDetailsPage from './pages/CharacterDetailsPage';
import LocationDetailPage from './pages/LocationDetailPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '*', element: <Navigate to='/' replace /> },
      { path: '/', element: <HomePage /> },
      { path: '/characters', element: <CharactersPage /> },
      { path: '/characters/:characterId', element: <CharacterDetailsPage /> },
      { path: '/locations', element: <LocationsPage /> },
      { path: '/locations/:locationId', element: <LocationDetailPage /> },
      { path: '/episodes', element: <EpisodesPage /> }
    ]
  }
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;