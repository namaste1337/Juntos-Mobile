import {combineReducers} from 'redux';
import sessionReducer from './../reducers/session-reducer';
import AppNavigationReducer from '../navigation/AppNavigationReducer';

const ALL_REDUCERS = combineReducers({
	session: sessionReducer,
	nav: AppNavigationReducer
});


export default ALL_REDUCERS;