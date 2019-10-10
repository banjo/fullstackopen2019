import React from 'react';
import { Input, Button } from 'semantic-ui-react';

const BlogForm = ({ handleSubmit, blogTitle, blogAuthor, blogUrl }) => {
    return (
        <div>
            <h3>Create new post</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    title: <Input {...blogTitle.bind} />
                </div>
                <div>
                    author: <Input {...blogAuthor.bind} />
                </div>
                <div>
                    url: <Input {...blogUrl.bind} />
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
