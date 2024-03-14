import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

function SearchBar() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = "b719e8b32bafe738c1a57782ebae0d6a";
    const weatherDescriptions = {
        "clear sky": "ciel dégagé",
        "few clouds": "quelques nuages",
        "scattered clouds": "nuages épais",
        "broken clouds": "nuages épais",
        "shower rain": "averses",
        rain: "pluie",
        thunderstorm: "orage",
        snow: "neige",
        mist: "brume",
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://api-adresse.data.gouv.fr/search/?q=${city}&type=municipality`
                );
                const { features } = response.data;
                if (features.length > 0) {
                    const { geometry } = features[0];
                    const { coordinates } = geometry;
                    const [lon, lat] = coordinates;
                    const weatherResponse = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
                    );
                    const temperatureInCelsius =
                        weatherResponse.data.main.temp - 273.15;
                    const description =
                        weatherResponse.data.weather[0].description;
                    const translatedDescription =
                        weatherDescriptions[description] || description;
                    setWeatherData({
                        ...weatherResponse.data,
                        main: {
                            ...weatherResponse.data.main,
                            temp: temperatureInCelsius,
                        },
                        weather: [
                            {
                                ...weatherResponse.data.weather[0],
                                description: translatedDescription,
                            },
                        ],
                    });
                } else {
                    console.error("Ville non trouvée");
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };
        if (city) {
            fetchWeatherData();
        }
    }, [city]);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Entrer le nom d'une ville"
                value={city}
                onChange={handleInputChange}
            />
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <p>Température: {weatherData.main.temp.toFixed(2)}°C</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                    <p>Humidité: {weatherData.main.humidity}%</p>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
