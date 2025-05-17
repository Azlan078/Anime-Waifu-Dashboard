import React from 'react';
import './ThemeSelector.css';

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { id: 'default', name: 'Sakura Pink', color: '#ff3d71' },
    { id: 'cosmic', name: 'Cosmic Void', color: '#a855f7' },
    { id: 'moonlit', name: 'Moonlit Night', color: '#60a5fa' },
    { id: 'aurora', name: 'Northern Lights', color: '#4ade80' },
    { id: 'winter', name: 'Winter Night', color: '#a5b4fc' },
    { id: 'cyberpunk', name: 'Cyber Neon', color: '#00fff0' },
  ];

  return (
    <div className="theme-selector">
      <h3 className="theme-title">Select Theme</h3>
      <div className="theme-options">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
            onClick={() => onThemeChange(theme.id)}
            style={{ '--theme-color': theme.color }}
            aria-label={`Select ${theme.name} theme`}
          >
            <span className="theme-color-preview"></span>
            <span className="theme-name">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;