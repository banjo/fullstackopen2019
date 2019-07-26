import React, { useState, useEffect } from "react";
import axios from "axios";
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
        axios.get("http://localhost:3001/persons").then(response => {
            setPersons(response.data);
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
            number: newNumber
        };

        // update filter if search is active
        if (filteredPersons.length > 0) {
            setFilteredPersons(filteredPersons.concat(contact));
        }

        // add contact to phonebook and reset form
        setPersons(persons.concat(contact));
        setNewName("");
        setNewNumber("");
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
                phonebook={persons}
                filteredPersons={filteredPersons}
                newFilter={newFilter}
            />
        </div>
    );
};

export default App;
