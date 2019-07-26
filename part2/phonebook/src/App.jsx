import React, { useState } from "react";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" }
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [filteredPersons, setFilteredPersons] = useState([]);

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
