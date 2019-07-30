import React, { useEffect } from "react";
import axios from "axios";
import Countries from "./Countries";

const Results = ({ query, setQuery, countries, setCountries }) => {
    // get data from api
    useEffect(() => {
        axios
            .get(`https://restcountries.eu/rest/v2/name/${query}`)
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                setCountries([]);
            });
    }, [query, setCountries]);

    // rule for too many results in the api
    let tooManyResults = countries.length > 10 ? true : false;

    // return countries if matches are below 10
    if (countries.length === 0) {
        return "";
    } else if (tooManyResults) {
        return "Too many matches, specify another filter";
    } else {
        return <Countries countries={countries} setQuery={setQuery} />;
    }
};

export default Results;
