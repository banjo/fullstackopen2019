import React from "react";
import Country from "./Country";

const Countries = ({ countries,  setQuery }) => {
    const showCountry = country => {
        setQuery(country.name);
    };

    if (countries.length > 1) {
        return countries.map(country => (
            <div key={country.alpha3Code}>
                {country.name}{" "}
                <button onClick={() => showCountry(country)}>show</button>
            </div>
        ));
    } else {
        let country = countries[0];
        return <Country country={country} />;
    }
};

export default Countries;
