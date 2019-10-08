import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
    if (notification.status === null) {
        return null;
    }

    const successStyle = {
        margin          : '10px 0',
        padding         : '10px',
        borderRadius    : '3px 3px 3px 3px',
        color           : '#270',
        backgroundColor : '#DFF2BF',
        width           : '500px'
    };

    const errorStyle = {
        margin          : '10px 0',
        padding         : '10px',
        borderRadius    : '3px 3px 3px 3px',
        color           : '#D8000C',
        backgroundColor : '#FFBABA',
        width           : '500px'
    };

    return <div style={notification.success ? successStyle : errorStyle}>{notification.message}</div>;
};

const mapStateToProps = (state) => {
    return {
        notification : state.notification
    };
};

export default connect(mapStateToProps)(Notification);
