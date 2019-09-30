import React from 'react';
import { connect } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { notificationChange, notificationReset } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
    const initialAnecdotes = props.anecdotes;
    const anecdotes = initialAnecdotes.sort((a, b) => b['votes'] - a['votes']);

    const vote = (id) => {
        props.addVote(id);
        const currentAnecdote = props.anecdotes.find((a) => a.id === id).content;

        // send notification
        props.notificationChange(`You voted "${currentAnecdote}"`);
        setTimeout(() => {
            props.notificationReset();
        }, 5000);
    };

    return (
        <div>
            {anecdotes.map((anecdote, index) => (
                <div key={index}>
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

const mapStateToProps = (state) => {
    return {
        anecdotes    : state.anecdote,
        notification : state.notification
    };
};

const mapDispatchToProps = {
    addVote,
    notificationChange,
    notificationReset
};

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default ConnectedAnecdoteList;
