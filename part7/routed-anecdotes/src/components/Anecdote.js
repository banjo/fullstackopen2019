import React from 'react';

const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <div>Author: {anecdote.author}</div>
            <div>Votes: {anecdote.votes}</div>
            <br />
        </div>
    );
};

export default Anecdote;
