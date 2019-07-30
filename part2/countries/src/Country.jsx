import React from "react";

const Country = ({ country }) => {
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
        </div>
    );
};

export default Country;
