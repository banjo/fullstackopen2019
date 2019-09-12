import React, { useState } from 'react';
const Blog = ({ blog }) => {
	const [ expand, setExpand ] = useState(false);

	const blogStyle = {
		paddingTop   : 10,
		paddingLeft  : 2,
		border       : 'solid',
		borderRadius : 5,
		borderWidth  : 1,
		marginBottom : 5
	};

	if (expand) {
		return (
			<div style={blogStyle}>
				<div onClick={() => setExpand(false)}>
					<div>{blog.title}</div>
					<div>{blog.url}</div>
					<div>
						{blog.likes} likes <button>Like</button>
					</div>
					<div>Added by {blog.author}</div>
				</div>
			</div>
		);
	}

	return (
		<div style={blogStyle}>
			<div onClick={() => setExpand(true)}>
				{blog.title} {blog.author}
			</div>
		</div>
	);
};

export default Blog;
