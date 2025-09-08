import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import Header from './components/Header';
import Home from './pages/Home';
import AboutPage from './pages/about';
import CoinsDetailPage from './pages/coin-details';
import NotFoundPage from './pages/not-found';

const API_URl = import.meta.env.VITE_API_URL;

function App() {
  const [coins, setCoins] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [limit, setLimit] = useState(10);

  const [filter, setFilter] = useState('');

  const [sortBy, setSortBy] = useState('market_cap_desc');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URl}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();

        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/coin/:id' element={<CoinsDetailPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
