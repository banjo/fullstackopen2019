import blogService from '../services/blogs';
import loginService from '../services/loginService';

const initialState = {
    username : '',
    name     : '',
    userId   : ''
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                username : action.data.username,
                name     : action.data.name,
                userId   : action.data.userId,
                token    : action.data.token
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token : action.data
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export const setUser = (user) => {
    return (dispatch) => {
        dispatch({
            type : 'SET_USER',
            data : user
        });
    };
};

export const setToken = (token) => {
    return async (dispatch) => {
        await blogService.setToken(token);
        dispatch({
            type : 'SET_TOKEN',
            data : token
        });
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type : 'LOGOUT'
        });
    };
};

export default loginReducer;
