import React from 'react';
import { Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { CurrentWeather } from '../types';
import { getWeatherIcon, getWeatherDescription } from '../utils/weatherUtils';
import './CurrentWeatherCard.css';

interface Props {
  weather: CurrentWeather;
}

export default function CurrentWeatherCard({ weather }: Props): React.ReactElement {
  return (
    <div className="current-weather-card">
      <div className="weather-main">
        <div className="weather-icon-large">
          {getWeatherIcon(weather.weatherCode)}
        </div>
        <div className="weather-info">
          <div className="temperature">{Math.round(weather.temperature)}°C</div>
          <div className="weather-description">{getWeatherDescription(weather.weatherCode)}</div>
          <div className="apparent-temp">
            Feels like {Math.round(weather.apparentTemperature)}°C
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">
            <Droplets size={24} />
          </div>
          <div className="detail-content">
            <div className="detail-label">Humidity</div>
            <div className="detail-value">{weather.humidity}%</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <Wind size={24} />
          </div>
          <div className="detail-content">
            <div className="detail-label">Wind Speed</div>
            <div className="detail-value">{Math.round(weather.windSpeed)} km/h</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <Gauge size={24} />
          </div>
          <div className="detail-content">
            <div className="detail-label">Precipitation</div>
            <div className="detail-value">{weather.precipitation} mm</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <Eye size={24} />
          </div>
          <div className="detail-content">
            <div className="detail-label">Updated</div>
            <div className="detail-value">{weather.timestamp.toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
