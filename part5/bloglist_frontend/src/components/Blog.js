import React, { useState } from 'react';
const Blog = ({ blog, likeHandler, removeHandler }) => {
	const [ expand, setExpand ] = useState(false);

	const blogStyle = {
		paddingTop   : 10,
		paddingLeft  : 2,
		border       : 'solid',
		borderRadius : 5,
		borderWidth  : 1,
		marginBottom : 5
	};

	const likeClicked = (event) => {
		event.preventDefault();

		// stop div from closing
		event.stopPropagation();

		// add like to database
		likeHandler({ ...blog, likes: blog.likes + 1 });
	};

	const removeClicked = (event) => {
		event.preventDefault();

		if (window.confirm(`Remove post ${blog.title} by ${blog.author}?`)) {
			removeHandler(blog);
			setExpand(false);
		}

		event.stopPropagation();
	};

	// if expanded
	if (expand) {
		return (
			<div style={blogStyle}>
				<div onClick={() => setExpand(false)}>
					<div>
						{blog.title} by {blog.author}
					</div>
					<div>{blog.url}</div>
					<div>
						{blog.likes} likes <button onClick={likeClicked}>Like</button>
					</div>
					<div>Added by {blog.user.name}</div>
					<div>
						<button onClick={removeClicked}>Remove</button>
					</div>
				</div>
			</div>
		);
	}

	// if normal state
	return (
		<div style={blogStyle}>
			<div onClick={() => setExpand(true)}>
				{blog.title} by {blog.author}
			</div>
		</div>
	);
};

export default Blog;
