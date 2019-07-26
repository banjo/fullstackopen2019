import React from "react";

const Filter = ({ newFilter, setNewFilter, setFilteredPersons, persons }) => {
    const handleFilterChange = event => {
        // update filter value
        setNewFilter(event.target.value);
        let filterWord = event.target.value;

        // sort out people who matches filter
        const filtered = persons.filter(person =>
            person.name.toLowerCase().includes(filterWord.toLowerCase())
        );

        // update filtered state
        setFilteredPersons(filtered);

    };
    return (
        <div>
            filter shown with:
            <input value={newFilter} onChange={handleFilterChange} />
        </div>
    );
};

export default Filter;
