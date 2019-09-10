import React, { useState } from 'react';

const BlogForm = ({}) => {
	let blogPost = { title: '', author: '', url: '' };

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const handleChange = (event) => {
		if (event.target.name === 'title') {
			blogPost = { ...blogPost, title: event.target.value };
		} else if (event.target.name === 'author') {
			blogPost = { ...blogPost, author: event.target.value };
		} else if (event.target.name === 'url') {
			blogPost = { ...blogPost, url: event.target.value };
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
