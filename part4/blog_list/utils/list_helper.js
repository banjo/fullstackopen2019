const dummy = blogs => 1;

const totalLikes = blogs => {
    return blogs
        .map(blog => blog.likes)
        .reduce((previous, current) => {
            return previous + current;
        }, 0);
};

module.exports = { dummy, totalLikes };
