import { useState, useEffect, use } from 'react';
import { useParams, Link } from 'react-router';

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
        // console.log(data);
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

  return (
    <div className='coin-details-container'>
      <Link to='/'>Back to Home</Link>
      <h1 className='coin-details-title'>
        {coin ? `${coin.name} (${coin.symbol})` : 'Coin Details'}
      </h1>
      {loading && <p>Loading...</p>}
      {error && <div className='error'>❌ {error}</div>}
      {!loading && !error && (
        <>
          <img
            className='coin-details-image'
            src={coin.image.large}
            alt={coin.name}
          />
          <p>{coin.description.en.split('. ')[0] + '.'} </p>
          <div className='coin-details-info'>
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h3>
            <h4>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </h4>
            <h4>24h High: #{coin.market_data.high_24h.usd.toLocaleString()}</h4>
            <h4>24h Low: #{coin.market_data.low_24h.usd.toLocaleString()}</h4>
            <h4>
              24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)}(
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>
            <h4>
              Circulating Supply:{' '}
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{' '}
              {coin.market_data.total_supply?.toLocaleString() || 'N/A'}
            </h4>
            <h4>
              All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{' '}
            </h4>
          </div>
        </>
      )}
    </div>
  );
}

export default CoinsDetailPage;
