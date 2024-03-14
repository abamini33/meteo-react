import React from "react";
import { WeatherContext } from "../context/context";

class WeatherCard extends React.Component {
    static contextType = WeatherContext;

    render() {
        const { weatherData } = this.context;
        return (
            <div className="weather-card">
                {weatherData ? (
                    <div className="weather-info">
                        <h2>{weatherData.name}</h2>
                        {weatherData.main && (
                            <p>Temperature: {weatherData.main.temp}°C</p>
                        )}
                        {weatherData.weather &&
                            weatherData.weather.length > 0 && (
                                <p>
                                    Météo: {weatherData.weather[0].description}
                                </p>
                            )}
                    </div>
                ) : (
                    <p>Aucune donnée météo disponible</p>
                )}
            </div>
        );
    }
}

export default WeatherCard;
