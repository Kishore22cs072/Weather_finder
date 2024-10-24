const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();


const apiKey = 'd23f0597ad31a59ccc380f76548ca9dd'; 
const port = 3003; 


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Weather API</h1><p>Use /weather/:city to get the weather for a specific city.</p>');
});


app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;

        res.json({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            wind_speed: weatherData.wind.speed,
            humidity: weatherData.main.humidity,
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'City not found' });
        } else {
            res.status(500).json({ message: 'Error fetching weather data' });
        }
    }
});


app.listen(port, () => {
    console.log(`Weather API is running on http://localhost:${port}`);
});
