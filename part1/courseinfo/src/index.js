import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
    <h1>{props.name}</h1>
)

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Content = (props) => {

    const courses = props.parts.map(part =>
        <Part name={part.name} exercises={part.exercises} />)

    return (<div>{courses}</div>)

}

const Total = (props) => {

    let length = 0

    props.parts.forEach(part =>
        length += part.exercises)

    return (
        <p>
            Number of exercises {length}
        </p>
    )
}


const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10
            },
            {
                name: "Using props to pass data",
                exercises: 7
            },
            {
                name: "State of a component",
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
