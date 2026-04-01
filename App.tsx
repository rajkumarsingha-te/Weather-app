import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WeatherInfo } from './components/WetherInfo';
import { EnvConfig } from './config/EnvConfig';
import * as Location from 'expo-location';

export default function App() {

  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = `http://api.weatherapi.com/v1/current.json?q=${location}&key=${EnvConfig.API_KEY}`;
  console.log(apiUrl);

  const getWeather = async (apiUrl: string) => {
    setLoading(true);
    await axios.get(apiUrl).then(response => {
      setWeather(response.data);
      console.log(response.data);
    }).catch(error => {
      Alert.alert('Error', error.response.data.error.message);
      setWeather(null);
    }).finally(() => {
      setLoading(false);
    });
  }

  const getWeatherByLocation = async () => {
    // console.log('getWeatherByLocation started');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      const apiUrl = `http://api.weatherapi.com/v1/current.json?q=${latitude},${longitude}&key=${EnvConfig.API_KEY}`;
      await getWeather(apiUrl);
      console.log(location);
      console.log(apiUrl);
      console.log(weather);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : weather ? <WeatherInfo location={weather.location.name} temperature={weather.current.temp_c} condition={weather.current.condition.text} /> : <Text>No weather data available</Text>}
      <TextInput placeholder='Enter your city' style={styles.input} value={location} onChangeText={(text) => setLocation(text)} />
      <TouchableOpacity onPress={() => {
        getWeather(apiUrl);
      }}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        getWeatherByLocation();
      }}>
        <Text style={styles.buttonText}>Get current location</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FFFF15',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  weatherInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
});
