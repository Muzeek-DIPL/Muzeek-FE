import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import keywordSlice from './keywordSlice';
import userSlice from './userSlice';

const reducer = combineReducers({
	keyword: keywordSlice,
	user: userSlice,
});

const store = configureStore({
	reducer: reducer,
});

export { store };
