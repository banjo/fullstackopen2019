const _ = require("lodash");

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

const mostBlogs = blogs => {
    let nameArray = _.map(blogs, "author"); // get an array with authors
    let mostCommonName = _.countBy(nameArray);

    let winner = Object.keys(mostCommonName).reduce((a, b) =>
        mostCommonName[a] > mostCommonName[b] ? a : b
    );

    return { author: winner, blogs: mostCommonName[winner] };
};

const mostLikes = blogs => {
    const authorsObject = blogs.map(blog => blog.author);
    const authorsArray = _.uniq(authorsObject);

    const arrayWithAuthors = [];

    authorsArray.forEach(author => {
        let numberOfLikes = 0;

        blogs.forEach(blog => {
            if (blog.author === author) {
                numberOfLikes += blog.likes;
            }
        });

        arrayWithAuthors.push({ author: author, likes: numberOfLikes });
    });

    const authorWithMostLikes = favoriteBlog(arrayWithAuthors); // get highest like with previous function
    return authorWithMostLikes;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
