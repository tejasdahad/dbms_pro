import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from '../reducers/users';

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            users:usersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}