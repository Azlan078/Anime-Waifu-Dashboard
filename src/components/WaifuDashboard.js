import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './WaifuDashboard.css';
import './AnimatedBackgrounds.css';
import ThemeSelector from './ThemeSelector';

// Fix the image imports by using the correct relative path
import chibiLeft from '../assets/images/chibi-left.png';
import chibiRight from '../assets/images/chibi-right.png';
import loadingAnime from '../assets/images/loading-anime.gif';

// Reduce the number of images to improve loading time
const IMAGES_PER_ROW = 4;
const NUM_ROWS = 2;
const NUM_IMAGES = IMAGES_PER_ROW * NUM_ROWS;

const WaifuDashboard = () => {
  const [waifus, setWaifus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [theme, setTheme] = useState('default');
  const [isMoonlit, setIsMoonlit] = useState(false);
  const starsContainerRef = useRef(null);

  // Create falling stars effect
  useEffect(() => {
    if (!starsContainerRef.current) return;
    
    const container = starsContainerRef.current;
    // Clear existing stars
    container.innerHTML = '';
    
    // Create 50 stars with random properties
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random position
      const startPos = Math.random() * window.innerWidth;
      star.style.left = `${startPos}px`;
      star.style.top = '-10px';
      
      // Random size between 1px and 3px
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random duration between 3s and 10s
      const duration = Math.random() * 7 + 3;
      star.style.animationDuration = `${duration}s`;
      
      // Random delay to start
      const delay = Math.random() * 10;
      star.style.animationDelay = `${delay}s`;
      
      // Add star to container
      container.appendChild(star);
    }
  }, [theme]);

  // Replace the current fetchWaifus function with this original version
  const fetchWaifus = useCallback(async () => {
    setLoading(true);
    setError(null);
    let images = [];
    let attempts = 0;
    const maxAttempts = 12;
    
    try {
      const promises = Array(NUM_IMAGES).fill().map(() => 
        axios.get('https://api.waifu.pics/sfw/waifu')
      );
      
      const responses = await Promise.all(promises);
      images = responses.map(response => response.data.url);
      
      images = [...new Set(images)];
      
      while (images.length < NUM_IMAGES && attempts < maxAttempts) {
        attempts++;
        const response = await axios.get('https://api.waifu.pics/sfw/waifu');
        if (!images.includes(response.data.url)) {
          images.push(response.data.url);
        }
      }
    } catch (err) {
      setError("Couldn't load all images. Please try again later.");
    }

    setWaifus(images);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchWaifus();
    
    // Load favorites from localStorage if available
    const savedFavorites = localStorage.getItem('waifuFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Load saved theme if available
    const savedTheme = localStorage.getItem('waifuTheme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [fetchWaifus]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('waifuFavorites', JSON.stringify(favorites));
  }, [favorites]);
  
  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('waifuTheme', theme);
    // Apply theme class to body
    document.body.className = `theme-${theme}${isMoonlit ? ' moonlit' : ''}`;
  }, [theme, isMoonlit]);

  const openImage = (imgUrl) => setSelectedImage(imgUrl);
  const closeModal = () => setSelectedImage(null);

  const downloadImage = (url, event) => {
    if (event) event.stopPropagation(); // Prevent opening modal when clicking download
    const link = document.createElement('a');
    link.href = url;
    link.download = `waifu-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFavorite = (url, event) => {
    if (event) event.stopPropagation(); // Prevent opening modal when clicking favorite
    setFavorites(prev => {
      if (prev.includes(url)) {
        return prev.filter(item => item !== url);
      } else {
        return [...prev, url];
      }
    });
  };

  const toggleShowFavorites = () => {
    setShowFavorites(prev => !prev);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  // Add this with other functions before the return statement
  const toggleMoonlight = () => {
    setIsMoonlit(prev => !prev);
    // Add moonlit class to body when toggled
    if (!isMoonlit) {
      document.body.classList.add('moonlit');
    } else {
      document.body.classList.remove('moonlit');
    }
  };

  // Images to display based on filter
  const displayImages = showFavorites ? favorites : waifus;

  // Return the correct background component based on current theme
  const renderThemeBackground = () => {
    switch(theme) {
      case 'cyberpunk':
        return <div className="cyberpunk-grid"></div>;
      case 'forest':
        return <div className="forest-particles">{Array(20).fill().map((_, i) => (
          <div 
            key={i} 
            className="leaf" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}</div>;
      case 'sunset':
        return <div className="sunset-rays"></div>;
      case 'midnight':
        return <div className="midnight-stars"></div>;
      case 'moonlit':
        return (
          <div className="clouds-container">
            <div className="cloud"></div>
            <div className="cloud"></div>
            <div className="cloud"></div>
          </div>
        );
      case 'cosmic':
        return (
          <div className="cosmic-background">
            <div className="cosmic-beam"></div>
            <div className="cosmic-planets">
              <div className="cosmic-planet-1"></div>
              <div className="cosmic-planet-2"></div>
              <div className="cosmic-planet-3"></div>
            </div>
            <div className="cosmic-elements"></div>
          </div>
        );
      default:
        // No background is rendered for the default theme
        return null;
    }
  };

  // Add this useEffect for cosmic theme elements
  useEffect(() => {
    if (theme === 'cosmic') {
      const container = document.querySelector('.dashboard-container');
      
      // Create cosmic beam
      const beam = document.createElement('div');
      beam.className = 'cosmic-beam';
      container.appendChild(beam);
      
      // Create planets
      const planet1 = document.createElement('div');
      planet1.className = 'cosmic-planet-1';
      container.appendChild(planet1);
      
      const planet2 = document.createElement('div');
      planet2.className = 'cosmic-planet-2';
      container.appendChild(planet2);
      
      // Create cosmic elements container
      const elementsContainer = document.createElement('div');
      elementsContainer.className = 'cosmic-elements';
      container.appendChild(elementsContainer);

      return () => {
        beam.remove();
        planet1.remove();
        planet2.remove();
        elementsContainer.remove();
      };
    }
  }, [theme]);

  return (
    <div className={`dashboard-container ${loading ? 'loading' : ''}`}>
      {/* Only render moon for specific themes */}
      {!['cosmic', 'default', 'aurora'].includes(theme) && (
        <div 
          className={`moon ${isMoonlit ? 'moonlit' : ''}`} 
          onClick={toggleMoonlight}
          title="Click to toggle moonlight"
          style={{ cursor: 'pointer' }}
        ></div>
      )}
      {theme === 'winter' && <div className="winter-background" />}
      {theme === 'aurora' && (
        <div className="aurora-background">
          <div className="aurora-waves" />
        </div>
      )}
      <div className="stars-container" ref={starsContainerRef}></div>
      {/* Theme-specific background */}
      {renderThemeBackground()}
      
      <header className="dashboard-header">
        <div className="chibi-header-wrapper">
          <img src={chibiLeft} alt="Chibi Left" className="chibi-img chibi-left" />
          <h1>Anime Waifu Dashboard</h1>
          <img src={chibiRight} alt="Chibi Right" className="chibi-img chibi-right" />
        </div>
        
        {/* Theme Selector */}
        <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
        
        <div className="button-group">
          <button onClick={fetchWaifus} className="action-button refresh-button">
            <span className="button-icon">↻</span> New Waifus
          </button>
          <button 
            onClick={toggleShowFavorites} 
            className={`action-button favorites-button ${showFavorites ? 'active' : ''}`}
          >
            <span className="button-icon">★</span> {showFavorites ? 'Show All' : 'Favorites'}
          </button>
        </div>
      </header>

      {loading && (
        <div className="loading-container">
          <img src={loadingAnime} alt="Loading" className="loading-animation" />
          <p className="loading-text">Summoning waifus...</p>
        </div>
      )}
      
      {error && (
        <div className="error-container">
          <p className="error-text">{error}</p>
          <button onClick={fetchWaifus} className="retry-button">Try Again</button>
        </div>
      )}

      {!loading && displayImages.length === 0 && showFavorites && (
        <div className="empty-favorites">
          <p>You haven't added any favorites yet!</p>
          <button onClick={() => setShowFavorites(false)} className="action-button">
            Browse Waifus
          </button>
        </div>
      )}

      {!loading && displayImages.length > 0 && (
        <div className="waifu-grid">
          {displayImages.map((url, index) => (
            <div className="waifu-card" key={`${url}-${index}`}>
              <div className="image-container" onClick={() => openImage(url)}>
                <LazyLoadImage
                  src={url}
                  alt={`Anime character ${index + 1}`}
                  effect="blur"
                  className="waifu-img"
                  placeholder={<div className="image-placeholder" />}
                />
              </div>
              {/* Fix: Ensure the card-actions is visible */}
              <div className="card-actions">
                <button 
                  className={`action-icon favorite-btn ${favorites.includes(url) ? 'favorited' : ''}`}
                  onClick={(e) => toggleFavorite(url, e)}
                  aria-label={favorites.includes(url) ? "Remove from favorites" : "Add to favorites"}
                >
                  {favorites.includes(url) ? '★' : '☆'}
                </button>
                <button 
                  className="action-icon download-btn"
                  onClick={(e) => downloadImage(url, e)}
                  aria-label="Download image"
                >
                  💾
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal} aria-label="Close modal">×</button>
            <img src={selectedImage} alt="Enlarged anime character" className="modal-image" />
            <div className="modal-actions">
              <button 
                className={`modal-btn favorite-btn ${favorites.includes(selectedImage) ? 'favorited' : ''}`}
                onClick={(e) => toggleFavorite(selectedImage, e)}
              >
                {favorites.includes(selectedImage) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button 
                className="modal-btn download-btn"
                onClick={(e) => downloadImage(selectedImage, e)}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
      
      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default WaifuDashboard;
