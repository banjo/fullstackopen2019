import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value;
        console.log(anecdote);
        props.store.dispatch(createAnecdote(anecdote));
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
