# Anime Waifu Dashboard

A React-based dashboard for browsing and managing anime waifus with beautiful animated themes, interactive UI components, and a responsive design.

## Features

### Themes
- Moonlit Night - Serene blue theme with floating clouds
- Winter Night - Snowy aesthetic with gentle particle effects
- Northern Lights (Aurora) - Dynamic aurora waves
- Cyber Neon - Futuristic grid animations
- Cosmic Void - Space-themed with stellar effects
- Sakura Pink (Default) - Cherry blossom inspired

### Core Functionality
- Dynamic theme switching with animated backgrounds
- Waifu image gallery with lazy loading
- Favorites system with localStorage persistence
- Image modal view with download capability
- Responsive design for all screen sizes
- Interactive UI elements with hover effects

## Project Structure

```
anime-waifu-dashboard/
│
├── src/
│   ├── components/
│   │   ├── AnimatedBackgrounds.css    # Theme animations
│   │   ├── ThemeSelector.js          # Theme selection component
│   │   ├── ThemeSelector.css         # Theme selector styles
│   │   ├── WaifuDashboard.js         # Main dashboard component
│   │   └── WaifuDashboard.css        # Dashboard styles
│   ├── assets/
│   │   ├── chibi-left.png            # Header decoration
│   │   ├── chibi-right.png           # Header decoration
│   │   └── loading-anime.gif         # Loading animation
│   └── App.js                        # Main app component
```

## How to Run

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Key Components

### WaifuDashboard
- Main container component
- Handles image fetching and state management
- Manages favorites system
- Controls theme switching

### ThemeSelector
- Theme selection interface
- Manages theme state
- Provides visual theme previews

### AnimatedBackgrounds
- Contains theme-specific animations
- Manages particle effects
- Handles background transitions

## Technologies Used
- React.js
- CSS3 Animations
- Local Storage API
- Lazy Loading Images
- Waifu.pics API

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Notes
- Use `CTRL + SHIFT + R` to hard refresh when testing theme changes
- Theme configurations are in `AnimatedBackgrounds.css`
- Image lazy loading improves performance

Made By The Biggest Otaku - MD AZLAN