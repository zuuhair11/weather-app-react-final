import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import "./App.css";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
    const [weatherData, setWeatherData] = useState({ ready: false });
    const [city, setCity] = useState(props.defaultCity);

    function handleResponse(response) {
        console.log(response.data);
        setWeatherData({
            ready: true,
            city: response.data.city,
            date: new Date(response.data.daily[0].time * 1000),
            temperature: response.data.daily[0].temperature.day,
            description: response.data.daily[0].condition.description,
            humidity: response.data.daily[0].temperature.humidity,
            wind: response.data.daily[0].wind.speed,
            iconUrl: response.data.daily[0].condition.icon_url,
            coordinates:response.data.coordinates,
        })
    }

    function search() {
        const apiKey = "0f605ca33b8d413fa995ab3t060267od";
        let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
    }

    function handleSubmit(event) {
        event.preventDefault();
        search(city);
    }

    function handleCityChange(event) {
        setCity(event.target.value);
    }

    if (weatherData.ready) {
        return (
            <div className="html">
                <div className="container">
                    <h1>Todays Weather</h1>
                    <div className="search">
                        <form onSubmit={handleSubmit} className="searchbutton" id="search-form">
                            <input onChange={handleCityChange} className="city-search" type="search" placeholder="Enter a place..." autoComplete="off" autoFocus="on" />
                            <input className="search-submit" type="submit" value="search" />
                        </form>
                    </div>
                    <WeatherInfo data={weatherData} />
                    <WeatherForecast data={weatherData.coordinates} />
                </div>
            </div>
        );
    } else {
        search()
        return "Loading weather data..."
    }
}