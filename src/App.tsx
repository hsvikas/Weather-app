import { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { weatherAPI } from './api/weatherAPI';
import { CurrentWeather, HistoricalWeather, MarineWeather, Coordinates } from './types';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import HistoricalWeatherCard from './components/HistoricalWeatherCard';
import MarineWeatherCard from './components/MarineWeatherCard';
import './App.css';

function App() {
  const [location, setLocation] = useState('New York');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [historicalWeather, setHistoricalWeather] = useState<HistoricalWeather[]>([]);
  const [marineWeather, setMarineWeather] = useState<MarineWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'current' | 'historical' | 'marine'>('current');

  useEffect(() => {
    fetchWeather(location);
  }, []);

  const fetchWeather = async (locationName: string) => {
    setLoading(true);
    setError('');
    try {
      // Get coordinates
      const coords = await weatherAPI.getCoordinates(locationName);
      setCoordinates(coords);

      // Fetch all weather data
      const [current, historical, marine] = await Promise.all([
        weatherAPI.getCurrentWeather(coords.latitude, coords.longitude),
        weatherAPI.getHistoricalWeather(coords.latitude, coords.longitude),
        weatherAPI.getMarineWeather(coords.latitude, coords.longitude)
      ]);

      setCurrentWeather(current);
      setHistoricalWeather(historical);
      setMarineWeather(marine);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeather(location);
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>🌤️ Weather App</h1>
        <p>Current • Historical • Marine Weather Data</p>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search for a location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="search-input"
            />
          </div>
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && <div className="loading">Loading weather data...</div>}

      {coordinates && !loading && (
        <div className="main-content">
          <div className="location-header">
            <MapPin size={20} />
            <span>{coordinates.name}</span>
          </div>

          <div className="tabs">
            <button
              className={`tab ${activeTab === 'current' ? 'active' : ''}`}
              onClick={() => setActiveTab('current')}
            >
              Current Weather
            </button>
            <button
              className={`tab ${activeTab === 'historical' ? 'active' : ''}`}
              onClick={() => setActiveTab('historical')}
            >
              Historical (7 Days)
            </button>
            <button
              className={`tab ${activeTab === 'marine' ? 'active' : ''}`}
              onClick={() => setActiveTab('marine')}
            >
              Marine Weather
            </button>
          </div>

          <div className="content-area">
            {activeTab === 'current' && currentWeather && (
              <CurrentWeatherCard weather={currentWeather} />
            )}

            {activeTab === 'historical' && historicalWeather.length > 0 && (
              <HistoricalWeatherCard weather={historicalWeather} />
            )}

            {activeTab === 'marine' && marineWeather && (
              <MarineWeatherCard weather={marineWeather} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
