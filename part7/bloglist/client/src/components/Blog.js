import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop   : 10,
        paddingLeft  : 2,
        border       : 'solid',
        borderRadius : 5,
        borderWidth  : 1,
        marginBottom : 5
    };

    return (
        <div style={blogStyle}>
            <Link className="blog-link" to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
    );
};

export default Blog;
