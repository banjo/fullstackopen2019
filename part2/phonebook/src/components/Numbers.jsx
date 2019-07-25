import React from "react";

const Numbers = ({ phonebook, filter }) => {
    const names = phonebook.map(person => (
        <div key={person.name}>
            {person.name} {person.number}
        </div>
    ));

    return (
        <div>
            <h2>Numbers</h2>
            {filter.length === 0 ? names : "USE FILTER"}
        </div>
    );
};

export default Numbers;
