const logger = require('./logger');

const getTokenFrom = (request) => {
	const authorization = request.get('authorization');

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7);
	}

	return null;
};

const tokenExtractor = (request, response, next) => {
	const token = getTokenFrom(request);

	if (token) {
		request.token = token;
	}

	next();
};

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method);
	logger.info('Path:  ', request.path);
	logger.info('Body:  ', request.body);
	logger.info('---');
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === 'ValidationError' && error.errors.username) {
		return response.status(400).send({ error: 'Validation error, username must be unique' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).send({ error: 'Validation error, add URL and Title' });
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'invalid token' });
	}

	next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor };
