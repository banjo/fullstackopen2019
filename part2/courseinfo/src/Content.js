import React from 'react';

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Content = ({ course }) => {

    const courses = course.parts.map(part =>
        <Part name={part.name} exercises={part.exercises} key={part.name} />)

    return (<div>{courses}</div>)

}

export default Content
