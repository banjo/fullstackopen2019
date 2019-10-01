const initialState = '';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification;
        case 'RESET_NOTIFICATION':
            return initialState;
        default:
            return state;
    }
};

export const notificationChange = (notification) => {
    return {
        type         : 'SET_NOTIFICATION',
        notification
    };
};

export const notificationReset = () => {
    return { type: 'RESET_NOTIFICATION' };
};

export const setNotification = (notification, timeInSeconds) => {
    const timeInMilliseconds = timeInSeconds * 1000;

    return (dispatch) => {
        dispatch({
            type         : 'SET_NOTIFICATION',
            notification
        });

        setTimeout(() => {
            dispatch({
                type : 'RESET_NOTIFICATION'
            });
        }, timeInMilliseconds);
    };
};

export default reducer;
