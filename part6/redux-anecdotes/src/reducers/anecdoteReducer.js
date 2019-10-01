import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
    return {
        content : anecdote,
        id      : getId(),
        votes   : 0
    };
};

const reducer = (state = [], action) => {
    console.log('state now: ', state);
    console.log('action', action);

    switch (action.type) {
        case 'INCREMENT':
            const id = action.data.id;
            const anecdoteToChange = state.find((a) => a.id === id);
            const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 };
            const newAnecdotes = state.map((anecdote) => (anecdote.id === id ? changedAnecdote : anecdote));
            return newAnecdotes;
        case 'ADD':
            const anecdote = action.data.anecdote;
            return [ ...state, anecdote ];
        case 'INIT':
            return action.data;
        default:
            return state;
    }
};

export const initAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch({
            type : 'INIT',
            data : anecdotes
        });
    };
};

export const createAnecdote = (anecdote) => {
    return async (dispatch) => {
        const addedAnecdote = await anecdoteService.createNew(anecdote);
        dispatch({
            type : 'ADD',
            data : { anecdote: addedAnecdote }
        });
    };
};

export const addVote = (id) => {
    return {
        type : 'INCREMENT',
        data : { id }
    };
};

export default reducer;
