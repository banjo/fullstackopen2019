import React, { useEffect, useState } from 'react';
import blogService from './services/blogs';
import loginService from './services/loginService';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useField } from './hooks/index';

function App() {
    const [ blogs, setBlogs ] = useState([ {} ]);
    const [ user, setUser ] = useState(null);
    const [ notification, setNotification ] = useState({ status: null, success: true, message: '' });
    // const [ blogPost, setBlogPost ] = useState({ title: '', author: '', url: '' });
    const username = useField('text');
    const password = useField('password');
    const blogTitle = useField('text');
    const blogAuthor = useField('text');
    const blogUrl = useField('text');

    // get all blogs
    useEffect(() => {
        const getBlogs = async () => {
            const allBlogs = await blogService.getAll();
            setBlogs(allBlogs);
        };
        getBlogs();
    }, []);

    // get user if stored locally
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            blogService.setToken(user.token);
            setUser(user);
        }
    }, []);

    // add notifications
    const addNotification = (success, message) => {
        setNotification({
            status  : true,
            success : success,
            message : message
        });
        setTimeout(() => {
            setNotification({ status: null });
        }, 5000);
    };

    // handlers
    const loginHandler = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login(username.value, password.value);

            // save user locally
            window.localStorage.setItem('loggedUser', JSON.stringify(user));

            blogService.setToken(user.token);
            setUser(user);
            username.reset();
            password.reset();
        } catch (error) {
            addNotification(false, 'Wrong username or password');
        }
    };

    const logoutHandler = async () => {
        window.localStorage.clear();
        setUser(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formEvent = event.target;

        let blogPost = { title: blogTitle.value, author: blogAuthor.value, url: blogUrl.value };

        try {
            await blogService.addBlog(blogPost);
            const newBlogs = await blogService.getAll();

            setBlogs(newBlogs);

            blogTitle.reset();
            blogAuthor.reset();
            blogUrl.reset();

            formEvent.reset();

            addNotification(true, `A new blog added: ${blogPost.title} by ${blogPost.author}`);
        } catch (error) {
            console.log(error);
        }
    };

    const likeHandler = async (blog) => {
        try {
            const newPost = await blogService.addLike(blog);
            const newBlogs = blogs.map((blog) => (blog.id === newPost.id ? newPost : blog));
            setBlogs(newBlogs);
            addNotification(true, 'Liked post');
        } catch (error) {
            console.log(error);
        }
    };

    const removeHandler = async (blog) => {
        try {
            const deletedPost = await blogService.removePost(blog);
            const newBlogs = blogs.filter((blog) => blog.id !== deletedPost.id);
            setBlogs(newBlogs);
            addNotification(true, 'Post removed');
        } catch (error) {
            console.log(error);
        }
    };

    // sort blogs for most likes
    blogs.sort((a, b) => b.likes - a.likes);

    // turn blogs to HTML
    const blogItems = blogs.map((blog, index) => (
        <Blog key={index} blog={blog} likeHandler={likeHandler} removeHandler={removeHandler} user={user} />
    ));

    // return login if not logged in
    if (user === null) {
        return (
            <div>
                <h2>Log in</h2>
                <Notification notification={notification} />
                <LoginForm loginHandler={loginHandler} username={username} password={password} />
            </div>
        );
    }

    // return blogs if logged in
    return (
        <div className="App">
            <div>
                <h2>Blogs</h2>
                <Notification notification={notification} />
                <div>
                    {user.name} logged in
                    <input type="button" value="logout" onClick={logoutHandler} />
                </div>
                <br />
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
        </div>
    );
}

export default App;
