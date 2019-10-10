import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data;
        case 'NEW_BLOG':
            return action.data;
        case 'DELETE_BLOG':
            return action.data;
        case 'LIKE_BLOG':
            return action.data;
        case 'ADD_COMMENT':
            return action.data;
        default:
            return state;
    }
};

export const initBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch({
            type : 'INIT_BLOGS',
            data : blogs
        });
    };
};

export const createBlog = (blog) => {
    return async (dispatch) => {
        await blogService.addBlog(blog);
        const blogs = await blogService.getAll();

        dispatch({
            type : 'NEW_BLOG',
            data : blogs
        });
    };
};

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        await blogService.removePost(blog);
        const blogs = await blogService.getAll();
        dispatch({
            type : 'DELETE_BLOG',
            data : blogs
        });
    };
};

export const likeBlog = (blog) => {
    return async (dispatch) => {
        await blogService.addLike(blog);
        const blogs = await blogService.getAll();
        dispatch({
            type : 'LIKE_BLOG',
            data : blogs
        });
    };
};

export const addComment = (blog, comment) => {
    return async (dispatch) => {
        blogService.addComment(blog, comment);
        const blogs = await blogService.getAll();

        dispatch({
            type : 'ADD_COMMENT',
            data : blogs
        });
    };
};

export default blogReducer;
