import {combineReducers} from 'redux';
import sessionReducer from './../reducers/session-reducer';
import projectReducer from './../reducers/project-reducer';
import AppNavigationReducer from '../navigation/AppNavigationReducer';

const ALL_REDUCERS = combineReducers({
	session: sessionReducer,
	nav: AppNavigationReducer,
	project: projectReducer
});


export default ALL_REDUCERS;