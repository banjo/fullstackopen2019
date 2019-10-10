const getUsers = (blogs) => {
    // get unique users
    const uniqueIds = [ ...new Set(blogs.map((blog) => blog.user.id)) ];

    // loop through ids to get all stats
    const userStats = uniqueIds.map((id) => {
        let currentUser = {
            id            : id,
            amountOfBlogs : 0,
            blogs         : []
        };

        // loop through blogs and compare to ID
        blogs.forEach((blog) => {
            if (blog.user.id === id) {
                currentUser = {
                    ...currentUser,
                    name          : blog.user.name,
                    amountOfBlogs : currentUser.amountOfBlogs + 1,
                    blogs         : currentUser.blogs.concat(blog)
                };
            }
        });

        return currentUser;
    });

    return userStats;
};

const usersReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_USERS':
        return action.data;
    default:
        return state;
    }
};

export const initUsers = (blogs) => {
    return async (dispatch) => {
        const users = getUsers(blogs);
        dispatch({
            type : 'INIT_USERS',
            data : users
        });
    };
};

export default usersReducer;
