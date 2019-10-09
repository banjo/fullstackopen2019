import React from 'react';
import { connect } from 'react-redux';

const Users = (props) => {
    const userInfo = props.users.map((user, index) => {
        return (
            <tr key={index}>
                <th>{user.name}</th>
                <th>{user.amountOfBlogs}</th>
            </tr>
        );
    });

    return (
        <div>
            <h2>Users</h2>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>{userInfo}</tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        login : state.login,
        blogs : state.blogs,
        users : state.users
    };
};

export default connect(mapStateToProps)(Users);
