import React from "react";

const Countries = ({ countries }) => {
    let countriesToShow = [];

    if (countries.length > 1) {
        countriesToShow = countries.map(country => <div>{country.name}</div>);
    } else {
        let country = countries[0];
        return (
            <div>
                <div>
                    <h2>
                        <strong>{country.name}</strong>
                    </h2>
                </div>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
            </div>
        );
    }

    return countriesToShow;
};

export default Countries;
