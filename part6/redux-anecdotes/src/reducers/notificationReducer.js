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

export default reducer;
