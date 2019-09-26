import React from 'react';

const App = (props) => {
    const initialAnecdotes = props.store.getState();
    const anecdotes = initialAnecdotes.sort((a, b) => b["votes"] - a["votes"]);

    const vote = (id) => {
        console.log('vote', id);
        props.store.dispatch({
            type : 'INCREMENT',
            data : { id }
        });
    };

    const addAnecdote = (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value;
        props.store.dispatch({
            type : 'ADD',
            data : { anecdote }
        });
        console.log(anecdote);
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
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

export default App;
