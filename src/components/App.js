import React from "react";
import "../App.css";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import { WeatherProvider } from "../context/context";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <WeatherProvider>
                    <div className="container">
                        <h1>App Météo</h1>
                        <SearchBar />
                        <WeatherCard />
                    </div>
                </WeatherProvider>
            </div>
        );
    }
}

export default App;
