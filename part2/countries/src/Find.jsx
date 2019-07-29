import React from "react";

const Find = ({ search, setSearch }) => {
    const handleSearchChange = event => setSearch(event.target.value);
    return (
        <div>
            find countries:{" "}
            <input value={search} onChange={handleSearchChange} />
        </div>
    );
};

export default Find;
