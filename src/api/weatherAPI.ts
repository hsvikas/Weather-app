import axios from 'axios';
import { CurrentWeather, HistoricalWeather, MarineWeather, Coordinates } from '../types';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '4d23f15cfd79948f3c91e6eea107e740';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0';

// Configure axios with timeout settings
const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const weatherAPI = {
  // Geocoding - Get coordinates from location name
  async getCoordinates(location: string): Promise<Coordinates> {
    try {
      const response = await apiClient.get(`${GEO_BASE_URL}/direct`, {
        params: {
          q: location,
          limit: 1,
          appid: API_KEY
        }
      });

      if (response.data && response.data.length > 0) {
        const result = response.data[0];
        return {
          latitude: result.lat,
          longitude: result.lon,
          name: `${result.name}${result.state ? ', ' + result.state : ''}${result.country ? ', ' + result.country : ''}`
        };
      }
      throw new Error('Location not found');
    } catch (error) {
      console.error('Geocoding error:', error);
      throw new Error('Failed to fetch coordinates: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  },

  // Current Weather
  async getCurrentWeather(latitude: number, longitude: number): Promise<CurrentWeather> {
    try {
      const response = await apiClient.get(`${WEATHER_BASE_URL}/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: 'metric'
        }
      });

      const data = response.data;
      return {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        apparentTemperature: data.main.feels_like,
        precipitation: data.rain?.['1h'] || 0,
        weatherCode: data.weather[0].id,
        timestamp: new Date(data.dt * 1000)
      };
    } catch (error) {
      console.error('Current weather error:', error);
      throw new Error('Failed to fetch current weather: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  },

  // Historical Weather (last 7 days - using forecast data)
  async getHistoricalWeather(latitude: number, longitude: number): Promise<HistoricalWeather[]> {
    try {
      const response = await apiClient.get(`${WEATHER_BASE_URL}/forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: 'metric',
          cnt: 40 // 5 days with 3-hour intervals
        }
      });

      const data = response.data.list;
      const dailyData: { [key: string]: HistoricalWeather } = {};

      data.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyData[date]) {
          dailyData[date] = {
            date: new Date(item.dt * 1000),
            maxTemp: item.main.temp_max,
            minTemp: item.main.temp_min,
            precipitation: item.rain?.['3h'] || 0,
            weatherCode: item.weather[0].id
          };
        } else {
          dailyData[date].maxTemp = Math.max(dailyData[date].maxTemp, item.main.temp_max);
          dailyData[date].minTemp = Math.min(dailyData[date].minTemp, item.main.temp_min);
          dailyData[date].precipitation += item.rain?.['3h'] || 0;
        }
      });

      return Object.values(dailyData).slice(0, 7);
    } catch (error) {
      console.error('Historical weather error:', error);
      throw new Error('Failed to fetch historical weather: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  },

  // Marine Weather
  async getMarineWeather(latitude: number, longitude: number): Promise<MarineWeather> {
    try {
      // Using weather data to simulate marine conditions
      const response = await apiClient.get(`${WEATHER_BASE_URL}/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: 'metric'
        }
      });

      const data = response.data;
      const windSpeed = data.wind.speed;
      
      return {
        waveHeight: Math.max(0.5, windSpeed * 0.15), // Estimate wave height based on wind
        wavePeriod: Math.max(3, windSpeed * 0.3),
        waveDirection: data.wind.deg || 0,
        windWaveHeight: Math.max(0.3, windSpeed * 0.1),
        windWavePeriod: Math.max(2, windSpeed * 0.2),
        swellWaveHeight: Math.max(0.2, (windSpeed - 5) * 0.1),
        swellWavePeriod: Math.max(4, windSpeed * 0.35),
        timestamp: new Date(data.dt * 1000)
      };
    } catch (error) {
      console.error('Marine weather error:', error);
      throw new Error('Failed to fetch marine weather: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }
};
