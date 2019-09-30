import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import anecdoteService from './services/anecdotes';
import { initAnecdotes } from './reducers/anecdoteReducer';

const App = (props) => {
    useEffect(
        () => {
            anecdoteService.getAll().then((anecdotes) => props.initAnecdotes(anecdotes));
        },
        [ props ]
    );

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default connect(null, { initAnecdotes })(App);
