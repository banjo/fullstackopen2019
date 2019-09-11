import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs }) => {
	const [ blogPost, setBlogPost ] = useState({ title: '', author: '', url: '' });

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formEvent = event.target;

		try {
			await blogService.addBlog(blogPost);
			setBlogs([ ...blogs, blogPost ]);
			setBlogPost({ title: '', author: '', url: '' });
			formEvent.reset();
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (event) => {
		if (event.target.name === 'title') {
			setBlogPost({ ...blogPost, title: event.target.value });
		} else if (event.target.name === 'author') {
			setBlogPost({ ...blogPost, author: event.target.value });
		} else if (event.target.name === 'url') {
			setBlogPost({ ...blogPost, url: event.target.value });
		}
	};

	return (
		<div>
			<h3>Create new post</h3>
			<form onSubmit={handleSubmit}>
				<div>
					title: <input type="text" name="title" onChange={handleChange} />
				</div>
				<div>
					author: <input type="text" name="author" onChange={handleChange} />
				</div>
				<div>
					url: <input type="text" name="url" onChange={handleChange} />
				</div>
				<input type="submit" value="submit" />
			</form>
		</div>
	);
};

export default BlogForm;
