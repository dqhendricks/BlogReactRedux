import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import PostsReducer from './reducer-posts';

const rootReducer = combineReducers( {
	form: reducerForm, // required wiring for redux-form
	posts: PostsReducer
} );

export default rootReducer;
