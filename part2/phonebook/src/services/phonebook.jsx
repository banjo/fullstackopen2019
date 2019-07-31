import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data);
};

const add = person => {
    return axios.post(baseUrl, person).then(response => response.data);
};

const deleteContact = id => {
    return axios.delete(baseUrl + `/${id}`);
};

const updateContact = person => {
    return axios
        .put(baseUrl + `/${person.id}`, person)
        .then(response => response.data);
};

export default { getAll, add, deleteContact, updateContact };
