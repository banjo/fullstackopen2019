import React from "react";

const Total = ({ course }) => {
    const total = course.parts
        .map(part => part.exercises)
        .reduce((sum, current) => sum + current);

    return <p> Number of exercises {total} </p>;
};

export default Total;
