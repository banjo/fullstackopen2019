const initialState = {
    status  : null,
    success : true,
    message : ''
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'CREATE':
        return {
            ...state,
            status  : true,
            success : action.data.success,
            message : action.data.message
        };
    case 'REMOVE':
        return initialState;
    default:
        return state;
    }
};

export const setNotification = (message, success = true) => {
    return async (dispatch) => {
        dispatch({
            type : 'CREATE',
            data : { message, success }
        });

        setTimeout(() => {
            dispatch({ type: 'REMOVE' });
        }, 5000);
    };
};

export default notificationReducer;
