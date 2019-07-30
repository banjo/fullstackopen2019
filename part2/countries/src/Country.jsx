import React, { useEffect, useState } from "react";
import Axios from "axios";

const Country = ({ country }) => {
    const [weather, setWeather] = useState({});

    // get weather from api
    useEffect(() => {
        Axios.get("http://api.apixu.com/v1/forecast.json?", {
            params: {
                q: country.name,
                key: "3c069699fb8d48a0b8d111919193007"
            }
        }).then(response => {
            setWeather({
                temp: response.data.current.temp_c,
                wind: response.data.current.wind_kph,
                windDir: response.data.current.wind_dir,
                pic: response.data.current.condition.icon
            });
        });
    }, [setWeather, country]);

    return (
        <div>
            <div>
                <h2>
                    <strong>{country.name}</strong>
                </h2>
            </div>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <div>
                <h2>Languages</h2>
            </div>
            <div>
                <ul>
                    {country.languages.map(language => (
                        <li key={language.name}>{language.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <img
                    src={country.flag}
                    alt="country flag"
                    heigth="100"
                    width="100"
                />
            </div>
            <div>
                <h2>Weather in {country.name}</h2>
            </div>
            <div>
                <strong>temperature:</strong> {weather.temp} Celsius
            </div>
            <div>
                <img
                    src={weather.pic}
                    alt="weather condition"
                    heigth="100"
                    width="100"
                />
            </div>
            <div>
                <strong>wind: </strong> {weather.wind} kph direction{" "}
                {weather.windDir}
            </div>
        </div>
    );
};

export default Country;
