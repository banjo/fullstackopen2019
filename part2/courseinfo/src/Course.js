import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Courses = ({ courses }) => {
    const courseContent = courses.map(course => (
        <div>
            <Header name={course.name} />
            <Content course={course} />
            <Total course={course} />
        </div>
    ));

    return <div>{courseContent}</div>;
};

export default Courses;
