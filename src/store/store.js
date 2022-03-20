import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import keywordSlice from './keywordSlice';

const reducer = combineReducers({
	keyword: keywordSlice,
});

const store = configureStore({
	reducer: reducer,
});

export { store };
