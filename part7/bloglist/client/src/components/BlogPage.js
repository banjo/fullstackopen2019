import React from 'react';
import { connect } from 'react-redux';

import { deleteBlog, likeBlog, addComment } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

import { useField } from '../hooks/index';

import { Input, Button } from 'semantic-ui-react';

const BlogPage = (props) => {
    const comment = useField('text');

    if (props.blog === undefined) {
        return null;
    }

    const likeHandler = async (blog) => {
        try {
            props.likeBlog(blog);
            props.setNotification('Liked post', true);
        } catch (error) {
            console.log(error);
        }
    };

    const removeHandler = async (blog) => {
        try {
            props.deleteBlog(blog);
            props.setNotification('Post removed', true);
        } catch (error) {
            console.log(error);
        }
    };

    const commentHandler = (event) => {
        event.preventDefault();

        props.addComment(props.blog, comment.value);
        props.setNotification('Added comment', true);
    };

    const likeClicked = (event) => {
        event.preventDefault();

        // add like to database
        likeHandler({ ...props.blog, likes: props.blog.likes + 1 });
    };

    const removeClicked = (event) => {
        event.preventDefault();

        if (window.confirm(`Remove post ${props.blog.title} by ${props.blog.author}?`)) {
            removeHandler(props.blog);
        }
    };

    const RemoveButton = () => {
        // return button if correct user
        if (props.username === props.blog.user.username) {
            return (
                <div>
                    <Button onClick={removeClicked}>Remove</Button>
                </div>
            );
        }

        return null;
    };

    const Comments = () => (
        <div>
            <h2>Comments</h2>
            <ul>{props.blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}</ul>
        </div>
    );

    return (
        <div>
            <h2>{props.blog.title}</h2>
            <div>{props.blog.url}</div>
            <div>
                {props.blog.likes} likes <Button onClick={likeClicked}>Like</Button>
            </div>
            <div>Added by {props.blog.user.name}</div>
            <RemoveButton />
            <br />
            <form onSubmit={commentHandler}>
                <div>
                    <Input {...comment.bind} />
                    <Button type="submit">Add comment</Button>
                </div>
            </form>
            <Comments />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        username : state.login.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        likeBlog        : (blog) => dispatch(likeBlog(blog)),
        deleteBlog      : (blog) => dispatch(deleteBlog(blog)),
        setNotification : (message, success) => dispatch(setNotification(message, success)),
        addComment      : (blog, comment) => dispatch(addComment(blog, comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
