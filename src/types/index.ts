export interface CurrentWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  apparentTemperature: number;
  precipitation: number;
  weatherCode: number;
  timestamp: Date;
}

export interface HistoricalWeather {
  date: Date;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
  weatherCode: number;
}

export interface MarineWeather {
  waveHeight: number;
  wavePeriod: number;
  waveDirection: number;
  windWaveHeight: number;
  windWavePeriod: number;
  swellWaveHeight: number;
  swellWavePeriod: number;
  timestamp: Date;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
  name: string;
}
