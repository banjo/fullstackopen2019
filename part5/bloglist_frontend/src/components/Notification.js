import React from 'react';

const Notification = ({ notification }) => {
	if (notification.status === null) {
		return <div />;
	}

	let messageStyle = {
		margin       : '10px 0',
		padding      : '10px',
		borderRadius : '3px 3px 3px 3px'
	};

	notification.success
		? (messageStyle = {
				...messageStyle,
				color           : '#270',
				backgroundColor : '#DFF2BF'
			})
		: (messageStyle = {
				...messageStyle,
				color           : '#D8000C',
				backgroundColor : '#FFBABA'
			});

	const message = ({ notification }) => {
		return <div style={messageStyle}>{notification.message}</div>;
	};

	return <div>{message}</div>;
};s

export default Notification;
