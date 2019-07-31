import React, { useState, useEffect } from "react";
import phonebook from "./services/phonebook";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [filteredPersons, setFilteredPersons] = useState([]);

    // effect hook for json server
    useEffect(() => {
        phonebook.getAll().then(phonebook => {
            setPersons(phonebook);
        });
    }, []);

    // add person on click
    const addPerson = event => {
        event.preventDefault();
        const allNames = persons.map(person => person.name);

        // Warning if duplicate
        if (allNames.includes(newName)) {
            alert(`${newName} is already added to the phonebook`);
            return;
        }

        // Warning if empty
        if (newName === "") {
            alert(`You cannot add an empty string`);
            return;
        }

        // create contact
        const contact = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        };

        // update filter if search is active
        if (filteredPersons.length > 0) {
            setFilteredPersons(filteredPersons.concat(contact));
        }

        // add to backend server and to webpage
        phonebook
            .add(contact)
            .then(contact => {
                setPersons(persons.concat(contact));
                setNewName("");
                setNewNumber("");
            })
            .catch(contact => alert(`Could not add ${contact.name}`));
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter
                value={newFilter}
                setNewFilter={setNewFilter}
                setFilteredPersons={setFilteredPersons}
                persons={persons}
            />

            <h2>Add a new contact</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
            />
            <h2>Numbers</h2>
            <Numbers
                contacts={persons}
                filteredPersons={filteredPersons}
                setFilteredPersons={setFilteredPersons}
                newFilter={newFilter}
                setContacts={setPersons}
            />
        </div>
    );
};

export default App;
