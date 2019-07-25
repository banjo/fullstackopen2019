import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ action, name }) => (<button onClick={action} >{name}</button>)

const TopAnecdote = ({ votes }) => {

    let topScore = 0
    let winner = 0

    Object.keys(votes).forEach(key => {
        if (votes[key] > topScore) {
            winner = key
            topScore = votes[key]
        }
    })

    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <div>{anecdotes[winner]}</div>
            <div>has {topScore} votes</div>
        </div>
    )
}

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })

    const getRandomNumber = (max) => (Math.floor(Math.random() * max))
    const updateSelected = () => (setSelected(getRandomNumber(anecdotes.length)))

    const updateVotes = (votee) => {
        const copy = { ...votes }
        copy[votee] += 1
        setVotes(copy)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]}</div>
            <div>has {votes[selected]} votes</div>
            <Button action={() => updateVotes(selected)} name="vote" />
            <Button action={() => updateSelected()} name="next anecdote" />
            <TopAnecdote votes={votes} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
