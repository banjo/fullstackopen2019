import React from "react";

const Total = ({ course }) => {
    const total = course.parts
        .map(part => part.exercises)
        .reduce((sum, current) => sum + current);

    return (
        <p>
            <strong> Number of exercises {total}</strong>
        </p>
    );
};

export default Total;
