import React, { useEffect, useState } from 'react';
import blogService from './services/blogs';
import loginService from './services/loginService';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

function App() {
	const [ blogs, setBlogs ] = useState([ {} ]);
	const [ user, setUser ] = useState(null);
	const [ login, setLogin ] = useState({ username: '', password: '' });
	const [ notification, setNotification ] = useState({ status: null, success: true, message: '' });
	const [ blogPost, setBlogPost ] = useState({ title: '', author: '', url: '' });

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
			const user = await loginService.login(login.username, login.password);

			// save user locally
			window.localStorage.setItem('loggedUser', JSON.stringify(user));

			blogService.setToken(user.token);
			setUser(user);
			setLogin({ username: '', password: '' });
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

		try {
			await blogService.addBlog(blogPost);

			setBlogs([ ...blogs, blogPost ]);
			setBlogPost({ title: '', author: '', url: '' });

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

	// sort blogs for most likes
	blogs.sort((a, b) => b.likes - a.likes);

	// turn blogs to HTML
	const blogItems = blogs.map((blog, index) => (
		<Blog key={index} blog={blog} likeHandler={likeHandler}/>
	));

	// return login if not logged in
	if (user === null) {
		return (
			<div>
				<h2>Log in</h2>
				<Notification notification={notification} />
				<LoginForm loginHandler={loginHandler} setLogin={setLogin} login={login} />
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
					<BlogForm blogPost={blogPost} setBlogPost={setBlogPost} handleSubmit={handleSubmit} />
				</Togglable>
				<br />

				<h3>Blog posts</h3>
				<div>{blogItems}</div>
			</div>
		</div>
	);
}

export default App;
