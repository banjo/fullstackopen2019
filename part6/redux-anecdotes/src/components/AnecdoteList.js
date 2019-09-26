import React from 'react';
import { addVote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
    const initialAnecdotes = props.store.getState();
    const anecdotes = initialAnecdotes.sort((a, b) => b['votes'] - a['votes']);

    const vote = (id) => {
        console.log('vote', id);
        props.store.dispatch(addVote(id));
    };

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteForm;
