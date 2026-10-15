const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample weather data for cities
const weatherData = [
  { city: 'Toronto', temperature: '12°柏C', condition: 'Cloudy', humidity: '65%' },
  { city: 'Vancouver', temperature: '15°C', condition: 'Rainy', humidity: '80%' },
  { city: 'Montreal', temperature: '10°C', condition: 'Sunny', humidity: '50%' }
];

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the City Weather API! Use /api/weather to see all cities.');
});

// GET all weather data
app.get('/api/weather', (req, res) => {
  res.json(weatherData);
});

// GET weather by specific city name
app.get('/api/weather/:city', (req, res) => {
  const cityName = req.params.city.toLowerCase();
  const cityWeather = weatherData.find(w => w.city.toLowerCase() === cityName);
  
  if (!cityWeather) {
    return res.status(404).json({ error: 'City not found' });
  }
  
  res.json(cityWeather);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});