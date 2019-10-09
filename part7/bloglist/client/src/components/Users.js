import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = (props) => {
    const userInfo = props.users.map((user, index) => {
        return (
            <tr key={index}>
                <th>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                </th>
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
        users : state.users
    };
};

export default connect(mapStateToProps)(Users);
