// services/weatherService.ts

const API_KEY = '94746cc1049c01161b98d42c367b045d';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`
    );
    
    if (!response.ok) {
      throw new Error('Cidade não encontrada');
    }
    
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do tempo:', error);
    throw error;
  }
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
    );
    
    if (!response.ok) {
      throw new Error('Localização não encontrada');
    }
    
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do tempo:', error);
    throw error;
  }
};