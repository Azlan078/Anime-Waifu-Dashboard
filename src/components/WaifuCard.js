import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './WaifuCard.css';

const WaifuCard = ({ 
  imageUrl, 
  onImageClick, 
  onDownload,
  onFavoriteToggle,
  isFavorite 
}) => {
  const handleDownload = (e) => {
    e.stopPropagation();
    onDownload(imageUrl);
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    onFavoriteToggle(imageUrl);
  };

  return (
    <div className="waifu-card" onClick={() => onImageClick(imageUrl)}>
      <div className="image-container">
        <LazyLoadImage
          src={imageUrl}
          alt="Anime character"
          effect="blur"
          className="waifu-img"
          placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400' width='300' height='400'%3E%3Crect width='300' height='400' fill='%23232323'/%3E%3C/svg%3E"
          wrapperClassName="lazy-load-wrapper"
        />
        <div className="card-overlay">
          <div className="card-actions">
            <button 
              className={`action-icon favorite-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={handleFavoriteToggle}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? '★' : '☆'}
            </button>
            <button 
              className="action-icon download-btn"
              onClick={handleDownload}
              aria-label="Download image"
            >
              💾
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

WaifuCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired
};

export default WaifuCard;