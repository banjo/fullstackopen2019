import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notificationChange, notificationReset } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value;
        console.log(anecdote);
        props.createAnecdote(anecdote);

        // send notification
        props.notificationChange(`Added new anecdote`);
        setTimeout(() => {
            props.notificationReset();
        }, 5000);
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

const mapDispatchToProps = {
    createAnecdote,
    notificationChange,
    notificationReset
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
