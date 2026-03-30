# Weather App - Front-end Application

A modern, responsive weather application built with React that displays current, historical, and marine weather data.

## Features

- **Current Weather**: Real-time weather conditions including temperature, humidity, wind speed, and more
- **Historical Weather**: 7-day weather history with min/max temperatures and precipitation data
- **Marine Weather**: Specialized data for marine activities including wave height, period, and direction
- **Location Search**: Search for any location worldwide with autocomplete
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Axios**: HTTP client for API requests
- **Lucide React**: Modern icon library
- **CSS3**: Custom styling with animations

## Installation

1. Navigate to the project directory

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## API

This app uses the free [Open-Meteo API](https://open-meteo.com/), which provides:
- Current weather data
- Historical weather data
- Marine weather conditions
- Geocoding for location search

No API key required!

## Project Structure

```
src/
├── api/
│   └── weatherAPI.ts       # Weather data fetching
├── components/
│   ├── CurrentWeatherCard  # Current weather display
│   ├── HistoricalWeatherCard # Historical data
│   └── MarineWeatherCard   # Marine conditions
├── types/
│   └── index.ts            # TypeScript interfaces
├── utils/
│   └── weatherUtils.ts     # Helper functions
├── App.tsx                 # Main app component
└── main.tsx                # Entry point
```

## Usage

1. **Search for Location**: Use the search bar to enter any location name
2. **View Current Weather**: See real-time weather data with detailed metrics
3. **Check Historical Data**: Review the last 7 days of weather
4. **Marine Weather**: Access specialized data for water-based activities

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Future Enhancements

- Weather alerts and warnings
- Hourly forecast
- Multiple location tracking
- Dark mode toggle
- Weather maps
- Air quality data
- UV index

## License

MIT
