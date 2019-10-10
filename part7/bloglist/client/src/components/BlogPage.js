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

    const Comments = () => (
        <div>
            <h2>Comments</h2>
            <br />
            <ul>{blog.comments.map((comment) => <li>{comment}</li>)}</ul>
        </div>
    );

    return (
        <div>
            <h2>{blog.title}</h2>
            <div>{blog.url}</div>
            <div>
                {blog.likes} likes <button onClick={likeClicked}>Like</button>
            </div>
            <div>Added by {blog.user.name}</div>
            <RemoveButton />
            <br />
            <Comments />
        </div>
    );
};

export default BlogPage;
