import React from 'react';
import { connect } from 'react-redux';

const Users = (props) => {
    const userInfo = props.blogs.map((blog) => {
        return <div>{blog.title}</div>;
    });

    return (
        <div>
            Hello from Users
            <br />
            {userInfo}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        login : state.login,
        blogs : state.blogs
    };
};

export default connect(mapStateToProps)(Users);
