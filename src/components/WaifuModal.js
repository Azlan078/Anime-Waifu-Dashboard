import React from 'react';
import PropTypes from 'prop-types';
import './WaifuModal.css';

const WaifuModal = ({ 
  imageUrl, 
  onClose, 
  onDownload, 
  onFavoriteToggle, 
  isFavorite 
}) => {
  // Prevent modal from closing when clicking its content
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="close-modal" onClick={onClose} aria-label="Close modal">×</button>
        <img 
          src={imageUrl} 
          alt="Enlarged anime character" 
          className="modal-image" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x600?text=Image+Error';
          }}
        />
        <div className="modal-actions">
          <button 
            className={`modal-btn favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={() => onFavoriteToggle(imageUrl)}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <button 
            className="modal-btn download-btn"
            onClick={() => onDownload(imageUrl)}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

WaifuModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired
};

export default WaifuModal;