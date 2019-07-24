import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick} >{text}</button>
    )
}

const Statistics = ({good, neutral, bad}) => {
    let all = good + neutral + bad
    let average = (all===0) ? 0 : ((good*1)+(bad*-1))/all
    let positive = (all===0) ? 0 : good/all

    if (all === 0) {
        return (
            <div>No feedback given</div>
        )
    }

    return (
        <div>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
            <div>all {all}</div>
            <div>average {average}</div>
            <div>positive {positive}</div>
        </div>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addOne = (setter, mood) => () => {
        setter(mood + 1)
    }

    return (
    <div>
        <h1>give feedback</h1>
        <Button onClick={addOne(setGood, good)} text={"good"} ></Button>
        <Button onClick={addOne(setNeutral, neutral)} text={"neutral"} ></Button>
        <Button onClick={addOne(setBad, bad)} text={"bad"} ></Button>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
    )
}

ReactDOM.render( < App / > ,
    document.getElementById('root')
)
