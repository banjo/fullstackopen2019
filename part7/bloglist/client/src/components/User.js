import React from 'react';
import { connect } from 'react-redux';

const User = (props) => {
    return <div>hello from User</div>;
};

const mapStateToProps = (state) => {
    return {
        user  : state.login,
        blogs : state.blogs
    };
};

export default connect(mapStateToProps)(User);
