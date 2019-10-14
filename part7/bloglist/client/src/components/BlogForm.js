import React from 'react';
import { Input, Button } from 'semantic-ui-react';

const BlogForm = ({ handleSubmit, blogTitle, blogAuthor, blogUrl }) => {
    return (
        <div>
            <h3>Create new post</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    title: <Input id="title" {...blogTitle.bind} />
                </div>
                <div>
                    author: <Input id="author" {...blogAuthor.bind} />
                </div>
                <div>
                    url: <Input id="url" {...blogUrl.bind} />
                </div>
                <br />
                <Button primary type="submit">
                    submit
                </Button>
            </form>
        </div>
    );
};

export default BlogForm;
