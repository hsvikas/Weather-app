import React from 'react';
import { HistoricalWeather } from '../types';
import { getWeatherIcon, getWeatherDescription } from '../utils/weatherUtils';
import './HistoricalWeatherCard.css';

interface Props {
  weather: HistoricalWeather[];
}

export default function HistoricalWeatherCard({ weather }: Props): React.ReactElement {
  return (
    <div className="historical-weather-card">
      <h2>Last 7 Days Weather</h2>
      <div className="historical-grid">
        {weather.map((day, index) => (
          <div key={index} className="historical-item">
            <div className="historical-date">
              {day.date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </div>

            <div className="historical-icon">
              {getWeatherIcon(day.weatherCode)}
            </div>

            <div className="historical-description">
              {getWeatherDescription(day.weatherCode)}
            </div>

            <div className="historical-temps">
              <div className="temp-max">
                <span className="label">Max</span>
                <span className="value">{Math.round(day.maxTemp)}°C</span>
              </div>
              <div className="temp-min">
                <span className="label">Min</span>
                <span className="value">{Math.round(day.minTemp)}°C</span>
              </div>
            </div>

            <div className="historical-precipitation">
              <span className="label">Rain</span>
              <span className="value">{day.precipitation} mm</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
