import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick} >{text}</button>
    )
}

const Statistic = ({ stat, text }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{stat}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    let all = good + neutral + bad
    let average = (all === 0) ? 0 : ((good * 1) + (bad * -1)) / all
    let positive = (all === 0) ? 0 : (good / all) * 100 + " %"

    if (all === 0) {
        return (
            <div>No feedback given</div>
        )
    }

    return (
        <table>
            <tbody>
                <Statistic stat={good} text="good" />
                <Statistic stat={neutral} text="neutral" />
                <Statistic stat={bad} text="bad" />
                <Statistic stat={all} text="all" />
                <Statistic stat={average} text="average" />
                <Statistic stat={positive} text="positive" />
            </tbody>
        </table>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={() => setGood(good + 1)} text={"good"} ></Button>
            <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} ></Button>
            <Button onClick={() => setBad(bad + 1)} text={"bad"} ></Button>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(< App />,
    document.getElementById('root')
)
