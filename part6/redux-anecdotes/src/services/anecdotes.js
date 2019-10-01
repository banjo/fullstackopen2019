import axios from 'axios';
import { asObject } from '../reducers/anecdoteReducer';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createNew = async (anecdote) => {
    const object = asObject(anecdote);
    const response = await axios.post(baseUrl, object);
    return response.data;
};

const addVote = async (id) => {
    const allAnecdotes = await getAll();
    const foundAnecdote = allAnecdotes.find((backendAnecdote) => backendAnecdote.id === id);
    const modifiedAnecdote = { ...foundAnecdote, votes: foundAnecdote.votes + 1 };
    const response = await axios.put(`${baseUrl}/${id}`, modifiedAnecdote);
    return response.data;
};

export default { getAll, createNew, addVote };
