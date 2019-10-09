import React from 'react';

const BlogPage = ({ blog, likeHandler, removeHandler, username }) => {
    if (blog === undefined) {
        return null;
    }

    const likeClicked = (event) => {
        event.preventDefault();

        // add like to database
        likeHandler({ ...blog, likes: blog.likes + 1 });
    };

    const removeClicked = (event) => {
        event.preventDefault();

        if (window.confirm(`Remove post ${blog.title} by ${blog.author}?`)) {
            removeHandler(blog);
        }
    };

    const RemoveButton = () => {
        // return button if correct user
        if (username === blog.user.username) {
            return (
                <div>
                    <button onClick={removeClicked}>Remove</button>
                </div>
            );
        }

        return null;
    };

    return (
        <div>
            <h2>{blog.title}</h2>
            <div>{blog.url}</div>
            <div>
                {blog.likes} likes <button onClick={likeClicked}>Like</button>
            </div>
            <div>Added by {blog.user.name}</div>
            <RemoveButton />
        </div>
    );
};

export default BlogPage;
