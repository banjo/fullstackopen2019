import React, { useEffect, useState } from 'react';
import blogService from './services/blogs';
// import axios from 'axios';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import loginService from './services/loginService';

function App() {
	const [ blogs, setBlogs ] = useState([ {} ]);
	const [ user, setUser ] = useState(null);
	const [ login, setLogin ] = useState({ username: '', password: '' });

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
			setUser(user);
		}
	}, []);

	// handlers
	const loginHandler = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login(login.username, login.password);

			// save user locally
			window.localStorage.setItem('loggedUser', JSON.stringify(user));

			setUser(user);
			setLogin({ username: '', password: '' });
		} catch (error) {
			//TODO: add response
			console.log('Wrong credentials');
		}
    };

    const logoutHandler = async () => {
        window.localStorage.clear()
        setUser(null)
    }

	// turn blogs to HTML
	const blogItems = blogs.map((blog, index) => <Blog key={index} blog={blog} />);

	// return login if not logged in
	if (user === null) {
		return (
			<div>
				<h2>Log in</h2>
				<LoginForm loginHandler={loginHandler} setLogin={setLogin} login={login} />
			</div>
		);
	}

	// return blogs if logged in
	return (
		<div className="App">
			<div>
				<h3>Blogs</h3>
				<div>
					{user.name} logged in
					<input type="button" value="logout" onClick={logoutHandler} />
				</div>
				<br />

				<div>{blogItems}</div>
			</div>
		</div>
	);
}

export default App;
