import React, { useState } from "react";
import Find from "./Find";
import Results from "./Results";

const App = () => {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);
    return (
        <div>
            <Find search={search} setSearch={setSearch} />
            <Results query={search} countries={countries} setCountries={setCountries} />
        </div>
    );
};

export default App;
