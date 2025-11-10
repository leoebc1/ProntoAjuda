import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Alert, Text, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";

import SimpleBlackBarWithToggle from "@/components/SimpleBlackBarWithToggle";
import HelpButton from "@/components/HelpButton";
import TelaReceita from "./TelaReceita";
import {
  getWeatherByCity,
  getWeatherByCoords,
  WeatherData,
} from "@/services/apis/apiTempo";

export default function HomeScreen() {
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("São Paulo");

  const loadWeatherData = async () => {
    setLoading(true);
    try {
      // Tenta pegar pela localização atual
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const weatherData = await getWeatherByCoords(
          location.coords.latitude,
          location.coords.longitude
        );
        setWeather(weatherData);
        setCity(weatherData.name);
      } else {
        // Fallback para cidade padrão
        const weatherData = await getWeatherByCity(city);
        setWeather(weatherData);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar a previsão do tempo");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleChange = (enabled: boolean): void => {
    if (enabled) {
      setIsToggleEnabled(true);
    }
  };

  const handleHelpPress = (): void => {
    Alert.alert("Ajuda", "Sua solicitação de ajuda foi enviada!");
  };

  // Função para definir cores baseadas no clima
  const getGradientColors = () => {
    if (!weather) return ["#87CEEB", "#4682B4"] as const;

    const condition = weather.weather[0].main;
    
    if (condition === 'Clear') return ['#4A90E2', '#004792ff'] as const;
    if (condition === 'Clouds') return ['#B0C4DE', '#778899'] as const;
    if (condition === 'Rain') return ['#2C3E50', '#34495E'] as const;
    if (condition === 'Thunderstorm') return ['#4A235A', '#2C3E50'] as const;
    if (condition === 'Snow') return ['#E0F7FA', '#90CAF9'] as const;
    
    return ['#87CEEB', '#4682B4'] as const;
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  // Se toggle estiver ativado renderiza a tela de receita
  if (isToggleEnabled) {
    return <TelaReceita onVoltar={() => setIsToggleEnabled(false)} />;
  }

  return (
    <LinearGradient colors={getGradientColors()} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : weather ? (
            <View style={styles.weatherContainer}>
              <Text style={styles.cityText}>
                {weather.name}, {weather.sys.country}
              </Text>

              <Text style={styles.temperatureText}>
                {Math.round(weather.main.temp)}°C
              </Text>

              <Text style={styles.weatherDescription}>
                {weather.weather[0].description}
              </Text>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>
                  Sensação: {Math.round(weather.main.feels_like)}°C
                </Text>
                <Text style={styles.detailText}>
                  Umidade: {weather.main.humidity}%
                </Text>
                <Text style={styles.detailText}>
                  Vento: {weather.wind.speed} m/s
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Erro ao carregar dados</Text>
              <Text style={styles.retryText} onPress={loadWeatherData}>
                Tentar novamente
              </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <HelpButton onPress={handleHelpPress} />
        </View>

        <SimpleBlackBarWithToggle onToggleChange={handleToggleChange} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  weatherContainer: {
    alignItems: "center",
  },
  cityText: {
    fontSize: 28,
    color: "#ffffff",
    fontWeight: "300",
    marginBottom: 10,
    textAlign: "center",
  },
  temperatureText: {
    fontSize: 72,
    color: "#ffffff",
    fontWeight: "200",
    marginVertical: 10,
  },
  weatherDescription: {
    fontSize: 20,
    color: "#ffffff",
    textTransform: "capitalize",
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 16,
    width: "80%",
  },
  detailText: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 8,
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  retryText: {
    fontSize: 16,
    color: "#ffffff",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});