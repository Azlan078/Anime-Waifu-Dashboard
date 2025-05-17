import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WaifuDashboard.css';

// Import chibi images properly (ensure these files exist in src/assets/images/)
import chibiLeft from './assets/images/chibi-left.png';
import chibiRight from './assets/images/chibi-right.png';

const IMAGES_PER_ROW = 4;
const NUM_ROWS = 2;
const NUM_IMAGES = IMAGES_PER_ROW * NUM_ROWS;

const WaifuDashboard = () => {
  const [waifus, setWaifus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWaifus = async () => {
    setLoading(true);
    setError(null);
    let images = [];

    while (images.length < NUM_IMAGES) {
      try {
        const response = await axios.get('https://api.waifu.pics/sfw/waifu');
        images.push(response.data.url);
      } catch {
        // Retry silently
      }
    }

    setWaifus(images);
    setLoading(false);
  };

  useEffect(() => {
    fetchWaifus();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="chibi-header-wrapper">
          <img src={chibiLeft} alt="Chibi Left" className="chibi-img chibi-left" />
          <h1>My Anime Waifu List</h1>
          <img src={chibiRight} alt="Chibi Right" className="chibi-img chibi-right" />
        </div>
        <button onClick={fetchWaifus} className="refresh-button">
          Refresh Waifus
        </button>
      </header>

      {loading && <p className="loading-text">Loading waifus...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="waifu-grid">
        {waifus.map((url, index) => (
          <div className="waifu-card" key={index}>
            <img src={url} alt={`waifu-${index}`} className="waifu-img" />
            <button
              className="download-btn"
              onClick={() => {
                const link = document.createElement('a');
                link.href = url;
                link.download = `waifu-${index}.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              💾
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaifuDashboard;
