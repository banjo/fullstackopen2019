const listHelper = require("../utils/list_helper");

describe("dummy", () => {
    test("dummy returns one", () => {
        const blogs = [];

        const result = listHelper.dummy(blogs);
        expect(result).toBe(1);
    });
});

describe("total likes", () => {
    const listWithOneBlog = [
        {
            title: "String",
            author: "String",
            url: "String",
            likes: 2,
            id: "5d6d289063d74122cc123a48"
        }
    ];

    test("when the list has only one blog, equal the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(2);
    });
});
