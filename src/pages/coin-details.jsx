import { useState, useEffect, use } from 'react';
import { useParams } from 'react-router';

const API_URl = import.meta.env.VITE_COIN_API_URL;

function CoinsDetailPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URl}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch coin data');
        const data = await res.json();
        console.log(data);
        setCoin(data);
      } catch (err) {
        console.log(err);

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return <div>Coins Details {id}</div>;
}

export default CoinsDetailPage;
