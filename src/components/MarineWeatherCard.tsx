import React from 'react';
import { Wind, Waves, Navigation } from 'lucide-react';
import { MarineWeather } from '../types';
import './MarineWeatherCard.css';

interface Props {
  weather: MarineWeather;
}

export default function MarineWeatherCard({ weather }: Props): React.ReactElement {
  return (
    <div className="marine-weather-card">
      <h2>🌊 Marine Weather Conditions</h2>

      <div className="marine-grid">
        {/* Wave Height */}
        <div className="marine-item">
          <div className="marine-icon">
            <Waves size={28} />
          </div>
          <div className="marine-content">
            <div className="marine-label">Wave Height</div>
            <div className="marine-value">{weather.waveHeight.toFixed(2)} m</div>
            <div className="marine-detail">Current sea surface</div>
          </div>
        </div>

        {/* Wave Period */}
        <div className="marine-item">
          <div className="marine-icon">
            <Waves size={28} />
          </div>
          <div className="marine-content">
            <div className="marine-label">Wave Period</div>
            <div className="marine-value">{weather.wavePeriod.toFixed(1)} s</div>
            <div className="marine-detail">Time between waves</div>
          </div>
        </div>

        {/* Wave Direction */}
        <div className="marine-item">
          <div className="marine-icon">
            <Navigation size={28} />
          </div>
          <div className="marine-content">
            <div className="marine-label">Wave Direction</div>
            <div className="marine-value">{weather.waveDirection}°</div>
            <div className="marine-detail">{getDirectionName(weather.waveDirection)}</div>
          </div>
        </div>

        {/* Wind Wave Height */}
        <div className="marine-item">
          <div className="marine-icon">
            <Wind size={28} />
          </div>
          <div className="marine-content">
            <div className="marine-label">Wind Wave Height</div>
            <div className="marine-value">{weather.windWaveHeight.toFixed(2)} m</div>
            <div className="marine-detail">Wind-driven waves</div>
          </div>
        </div>

        {/* Wind Wave Period */}
        <div className="marine-item">
          <div className="marine-icon">
            <Wind size={28} />
          </div>
          <div className="marine-content">
            <div className="marine-label">Wind Wave Period</div>
            <div className="marine-value">{weather.windWavePeriod.toFixed(1)} s</div>
            <div className="marine-detail">Wind wave cycle</div>
          </div>
        </div>

        {/* Swell Wave Height */}
        <div className="marine-item">
          <div className="marine-icon">
            <Waves size={28} />
          </div>
          <div className="marine-content">
            <div className="marine-label">Swell Wave Height</div>
            <div className="marine-value">{weather.swellWaveHeight.toFixed(2)} m</div>
            <div className="marine-detail">Ocean swell waves</div>
          </div>
        </div>

        {/* Swell Wave Period */}
        <div className="marine-item">
          <div className="marine-icon">
            <Waves size={28} />
          </div>
          <div className="marine-content">
            <div className="marine-label">Swell Wave Period</div>
            <div className="marine-value">{weather.swellWavePeriod.toFixed(1)} s</div>
            <div className="marine-detail">Swell cycle time</div>
          </div>
        </div>

        {/* Updated Time */}
        <div className="marine-item">
          <div className="marine-icon">
            <Navigation size={28} />
          </div>
          <div className="marine-content">
            <div className="marine-label">Last Updated</div>
            <div className="marine-value">{weather.timestamp.toLocaleTimeString()}</div>
            <div className="marine-detail">{weather.timestamp.toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      <div className="marine-note">
        <strong>Note:</strong> Marine data is particularly useful for sailors, fishermen, and coastal activities.
      </div>
    </div>
  );
}

function getDirectionName(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}
