import React from 'react';
import { addVote } from '../reducers/anecdoteReducer';
import { addTimedNotification } from '../reducers/notificationReducer';

const anecdoteList = (props) => {
    const initialAnecdotes = props.store.getState().anecdote;
    const anecdotes = initialAnecdotes.sort((a, b) => b['votes'] - a['votes']);

    const vote = (id) => {
        props.store.dispatch(addVote(id));
        const currentAnecdote = props.store.getState().anecdote.find((a) => a.id === id).content;
        addTimedNotification(`You voted "${currentAnecdote}"`, props.store);
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

export default anecdoteList;
