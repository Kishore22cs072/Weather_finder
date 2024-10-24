async function getWeather() {
    const city = document.getElementById('city').value;
    const weatherInfoDiv = document.getElementById('weather-info');
    const errorMessageDiv = document.getElementById('error-message');


    weatherInfoDiv.innerHTML = '';
    errorMessageDiv.innerHTML = '';

    if (city === '') {
        errorMessageDiv.innerHTML = 'Please enter a city name.';
        return;
    }

    try {
       
        const response = await fetch(`http://localhost:3003/weather/${city}`);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

      
        weatherInfoDiv.innerHTML = `
            <h2>Weather in ${data.city}</h2>
            <p><strong>Temperature:</strong> ${data.temperature}°C</p>
            <p><strong>Description:</strong> ${data.description}</p>
            <p><strong>Wind Speed:</strong> ${data.wind_speed} m/s</p>
            <p><strong>Humidity:</strong> ${data.humidity}%</p>
        `;
    } catch (error) {
        errorMessageDiv.innerHTML = 'Error fetching weather data: ' + error.message;
    }
}