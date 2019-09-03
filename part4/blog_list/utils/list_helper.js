const dummy = blogs => 1;

const totalLikes = blogs => {
    return blogs
        .map(blog => blog.likes)
        .reduce((previous, current) => {
            return previous + current;
        }, 0);
};

const favoriteBlog = blogs => {
    const likes = blogs.map(blog => blog.likes);
    const highest = Math.max.apply(Math, likes);
    return blogs.find(blog => blog.likes === highest);
};

module.exports = { dummy, totalLikes, favoriteBlog };
