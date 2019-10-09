import React from 'react';
import { connect } from 'react-redux';

const Users = (props) => {
    const getUsers = (blogs) => {
        // get unique users
        const uniqueIds = [ ...new Set(blogs.map((blog) => blog.user.id)) ];

        // loop through ids to get all stats
        const userStats = uniqueIds.map((id) => {
            let currentUser = {
                id            : id,
                amountOfBlogs : 0
            };

            // loop through blogs and compare to ID
            blogs.forEach((blog) => {
                if (blog.user.id === id) {
                    currentUser = {
                        ...currentUser,
                        name          : blog.user.name,
                        amountOfBlogs : currentUser.amountOfBlogs + 1
                    };
                }
            });

            return currentUser;
        });

        return userStats;
    };

    const userData = getUsers(props.blogs);

    const userInfo = userData.map((user, index) => {
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
        blogs : state.blogs
    };
};

export default connect(mapStateToProps)(Users);
