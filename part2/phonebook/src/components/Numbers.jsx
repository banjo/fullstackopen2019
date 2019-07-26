import React from "react";

const Numbers = ({ phonebook, filteredPersons, newFilter }) => {
    // create HTML for all contacts
    const names = phonebook.map(person => (
        <div key={person.name}>
            {person.name} {person.number}
        </div>
    ));

    // create HTML for filtered
    const filtered = filteredPersons.map(person => (
        <div key={person.name}>
            {person.name} {person.number}
        </div>
    ));

    // show filtered result or all names if no filter active
    let result =
        (newFilter.length > 0 && filteredPersons.length > 0) ||
        !(filteredPersons.length === 0 && newFilter.length === 0);

    return (
        <div>
            {result ? filtered : names}
        </div>
    );
};

export default Numbers;
