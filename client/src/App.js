import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Importing custom CSS

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeather(response.data);
      setError("");
    } catch (error) {
      setWeather(null);
      setError("City not found!");
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Weather Wizard</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="temp">{weather.main.temp}°C</p>
          <p>{weather.weather[0].description.toUpperCase()}</p>
          <p>🌡️ Feels like: {weather.main.feels_like}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
