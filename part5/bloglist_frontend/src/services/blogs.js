import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = async () => {
	const request = await axios.get(baseUrl);
	return request.data;
};

const addBlog = async (blog) => {
	const config = {
		headers : { Authorization: token }
	};
	const request = await axios.post(baseUrl, blog, config);
	return request.data;
};

const addLike = async (blog) => {
	const config = {
		headers : { Authorization: token }
	};

	const request = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
	return request.data;
};

export default { getAll, addBlog, setToken, addLike };
