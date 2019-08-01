import React, { useState, useEffect } from "react";
import phonebook from "./services/phonebook";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [successmessage, setSuccessMessage] = useState(null);

    // effect hook for json server
    useEffect(() => {
        phonebook.getAll().then(phonebook => {
            setPersons(phonebook);
        });
    }, []);

    // update the contact and forms locally
    const fixContact = contact => {
        setPersons(persons.concat(contact));
    };

    // update the filter with new addition
    const updateFilter = contact => {
        if (filteredPersons.length > 0) {
            setFilteredPersons(filteredPersons.concat(contact));
        }
    };

    // update filter with changing number
    const updateFilterForNewNumber = contact => {
        setFilteredPersons(
            filteredPersons.map(person =>
                person.id === contact.id ? contact : person
            )
        );
    };

    // add person on click
    const addPerson = event => {
        event.preventDefault();
        const allNames = persons.map(person => person.name);

        // create contact
        const contact = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        };

        // if duplicate, update number
        if (allNames.includes(newName)) {
            if (
                window.confirm(
                    `${newName} is already added to the phonebook, would you like to update the number?`
                )
            ) {
                // change the ID of contact to the ID of the person who should be changed
                contact.id = persons.filter(
                    person => person.name === contact.name
                )[0].id;

                // update filtered results
                updateFilterForNewNumber(contact);

                // add to phonebook
                phonebook
                    .updateContact(contact)
                    .then(() =>
                        setPersons(
                            persons.map(person =>
                                person.id === contact.id ? contact : person
                            )
                        )
                    )
                    .catch(error => alert(`Could not update number`));
            }
            return;
        }

        // Warning if empty
        if (newName === "") {
            alert(`You cannot add an empty string`);
            return;
        }

        // update filter if search is active
        updateFilter(contact);

        // reset forms
        setNewName("");
        setNewNumber("");

        // add to backend server and to webpage
        phonebook
            .add(contact)
            .then(contact => {
                fixContact(contact);
                setSuccessMessage(`Successfully added ${newName}`);
                setTimeout(() => setSuccessMessage(null), 5000);
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
            <Notification message={successmessage} />
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
