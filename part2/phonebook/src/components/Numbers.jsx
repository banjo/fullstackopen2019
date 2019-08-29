import React from "react";
import phonebook from "../services/phonebook";

const Numbers = ({
    contacts,
    filteredPersons,
    setFilteredPersons,
    newFilter,
    setContacts
}) => {
    const deleteContact = person => () => {
        console.log(person);
        if (window.confirm(`Delete ${person.name}?`)) {
            phonebook
                .deleteContact(person.id)
                .then(() => {
                    // update contacts
                    setContacts(
                        contacts.filter(contact => contact.id !== person.id)
                    );

                    // update filter if search is active
                    if (filteredPersons.length > 0) {
                        setFilteredPersons(
                            filteredPersons.filter(
                                contact => contact.id !== person.id
                            )
                        );
                    }
                })
                .catch(`Could not delete ${person}`);
        }
    };

    // create HTML for all contacts
    const names = contacts.map(person => (
        <div key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={deleteContact(person)}>delete</button>
        </div>
    ));

    // create HTML for filtered
    const filtered = filteredPersons.map(person => (
        <div key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={deleteContact(person)}>delete</button>
        </div>
    ));

    // show filtered result or all names if no filter active
    let result =
        (newFilter.length > 0 && filteredPersons.length > 0) ||
        !(filteredPersons.length === 0 && newFilter.length === 0);

    return <div>{result ? filtered : names}</div>;
};

export default Numbers;
