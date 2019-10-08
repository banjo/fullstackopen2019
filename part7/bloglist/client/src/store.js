import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogsReducer from './reducers/blogsReducer';
import loginReducer from "./reducers/loginReducer"

const reducer = combineReducers({
    blogs : blogsReducer,
    login : loginReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
