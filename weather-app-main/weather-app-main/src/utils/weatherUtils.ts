import React from 'react';
import { Cloud, CloudRain, Sun } from 'lucide-react';

// WMO Weather interpretation codes
export const getWeatherIcon = (code: number): React.ReactNode => {
  if (code === 0) return React.createElement(Sun, { className: 'w-8 h-8 text-yellow-400' });
  if (code === 1 || code === 2) return React.createElement(Cloud, { className: 'w-8 h-8 text-gray-400' });
  if (code === 3) return React.createElement(Cloud, { className: 'w-8 h-8 text-gray-500' });
  if ([45, 48].includes(code)) return React.createElement(Cloud, { className: 'w-8 h-8 text-gray-400' });
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return React.createElement(CloudRain, { className: 'w-8 h-8 text-blue-400' });
  if ([71, 73, 75, 77, 85, 86].includes(code)) return React.createElement(CloudRain, { className: 'w-8 h-8 text-cyan-400' });
  return React.createElement(Cloud, { className: 'w-8 h-8 text-gray-400' });
};

export const getWeatherDescription = (code: number) => {
  const descriptions: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return descriptions[code] || 'Unknown';
};
