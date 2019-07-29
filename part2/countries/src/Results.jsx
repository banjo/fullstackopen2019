import React, { useEffect } from "react";
import axios from "axios";
import Countries from "./Countries";

const Results = ({ query, countries, setCountries }) => {
    // get data from api
    useEffect(() => {
        if (query.length > 0) {
            axios
                .get(`https://restcountries.eu/rest/v2/name/${query}`)
                .then(response => {
                    setCountries(response.data);
                })
                .catch(error => {
                    setCountries([]);
                });
        }
    }, [countries, setCountries, query]);

    // rule for too many results in the api
    let tooManyResults =
        countries.length > 10 || countries.length === 0 ? true : false;

    // !error handling
    console.log(countries);

    // return countries if matches are below 10
    if (tooManyResults) {
        return "Too many matches, specify another filter";
    } else {
        return <Countries countries={countries} />;
    }
};

export default Results;
