import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import loginService from './services/loginService';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Users from './components/Users';

import { useField } from './hooks/index';
import { connect } from 'react-redux';

import { initBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogsReducer';
import { setUser, setToken, logout } from './reducers/loginReducer';
import { setNotification } from './reducers/notificationReducer';

function App(props) {
    const username = useField('text');
    const password = useField('password');
    const blogTitle = useField('text');
    const blogAuthor = useField('text');
    const blogUrl = useField('text');

    // init blogs
    const initBlogs = props.initBlogs;
    useEffect(
        () => {
            initBlogs();
        },
        [ initBlogs ]
    );

    // get user if stored locally
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            props.setToken(user.token);
            props.setUser(user);
        }
    }, []);

    // handlers
    const loginHandler = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login(username.value, password.value);

            // save user locally
            window.localStorage.setItem('loggedUser', JSON.stringify(user));

            props.setToken(user.token);
            props.setUser(user);

            username.reset();
            password.reset();
        } catch (error) {
            props.setNotification('Wrong username or password', false);
        }
    };

    const logoutHandler = async () => {
        window.localStorage.clear();
        props.logout();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formEvent = event.target;

        let blogPost = { title: blogTitle.value, author: blogAuthor.value, url: blogUrl.value };

        try {
            props.createBlog(blogPost);

            blogTitle.reset();
            blogAuthor.reset();
            blogUrl.reset();
            formEvent.reset();

            props.setNotification(`A new blog added: ${blogPost.title} by ${blogPost.author}`, true);
        } catch (error) {
            console.log(error);
        }
    };

    const likeHandler = async (blog) => {
        try {
            props.likeBlog(blog);
            props.setNotification('Liked post', true);
        } catch (error) {
            console.log(error);
        }
    };

    const removeHandler = async (blog) => {
        try {
            props.deleteBlog(blog);
            props.setNotification('Post removed', true);
        } catch (error) {
            console.log(error);
        }
    };

    // sort blogs for most likes
    props.blogs.sort((a, b) => b.likes - a.likes);

    // turn blogs to HTML
    const blogItems = props.blogs.map((blog, index) => (
        <Blog
            key={index}
            blog={blog}
            likeHandler={likeHandler}
            removeHandler={removeHandler}
            username={props.username}
        />
    ));

    // return login if not logged in
    if (props.username === '') {
        return (
            <div>
                <h2>Log in</h2>
                <Notification />
                <LoginForm loginHandler={loginHandler} username={username} password={password} />
            </div>
        );
    }

    // return blogs if logged in
    return (
        <div className="App">
            <Router>
                <div>
                    <h2>Blogs</h2>
                    <Notification />
                    <div>
                        {props.name} logged in
                        <input type="button" value="logout" onClick={logoutHandler} />
                    </div>
                    <br />

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <div>
                                <Togglable buttonLabel="Create new post">
                                    <BlogForm
                                        handleSubmit={handleSubmit}
                                        blogTitle={blogTitle}
                                        blogAuthor={blogAuthor}
                                        blogUrl={blogUrl}
                                    />
                                </Togglable>
                                <br />

                                <h3>Blog posts</h3>
                                <div>{blogItems}</div>
                            </div>
                        )}
                    />

                    <Route exact path="/users" render={() => <Users />} />
                </div>
            </Router>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        blogs        : state.blogs,
        username     : state.login.username,
        name         : state.login.name,
        userId       : state.login.userId,
        notification : state.notification
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initBlogs       : () => dispatch(initBlogs()),
        createBlog      : (blog) => dispatch(createBlog(blog)),
        deleteBlog      : (blog) => dispatch(deleteBlog(blog)),
        likeBlog        : (blog) => dispatch(likeBlog(blog)),
        setUser         : (user) => dispatch(setUser(user)),
        logout          : () => dispatch(logout()),
        setToken        : (token) => dispatch(setToken(token)),
        setNotification : (message, success) => dispatch(setNotification(message, success))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
