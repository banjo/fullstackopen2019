import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notificationChange, notificationReset } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value;
        console.log(anecdote);
        event.target.anecdote.value = '';
        const newAnecdote = await anecdoteService.createNew(anecdote);
        props.createAnecdote(newAnecdote);

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
