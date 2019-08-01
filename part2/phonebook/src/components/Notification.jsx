import React from "react";

const successStyle = {
    color: "#270",
    backgroundColor: "#dff2bf",
    margin: "10px 0",
    marginRight: "75%",
    padding: "10px",
    borderRadius: "3px 3px 3px 3px"
};

const errorStyle = {
    color: "#D8000C",
    backgroundColor: "#FFBABA",
    margin: "10px 0",
    marginRight: "75%",
    padding: "10px",
    borderRadius: "3px 3px 3px 3px"
};

const Notification = ({ message }) => {
    if (message.message === null) {
        return null;
    }

    return (
        <div
            className="success"
            style={message.isSuccess ? successStyle : errorStyle}
        >
            {message.message}
        </div>
    );
};

export default Notification;
