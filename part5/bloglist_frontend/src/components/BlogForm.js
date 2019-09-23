import React from 'react';

const BlogForm = ({ handleSubmit, blogTitle, blogAuthor, blogUrl }) => {
    return (
        <div>
            <h3>Create new post</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    title: <input {...blogTitle.bind} />
                </div>
                <div>
                    author: <input {...blogAuthor.bind} />
                </div>
                <div>
                    url: <input {...blogUrl.bind} />
                </div>
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default BlogForm;
