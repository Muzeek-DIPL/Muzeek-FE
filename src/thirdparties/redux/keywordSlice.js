import { createSlice } from '@reduxjs/toolkit';

export const keywordSlice = createSlice({
	name: 'keyword',
	initialState: {
		keyword: '',
	},
	reducers: {
		passKeyword: (state, action) => {
			state.keyword = action.payload;
		},
		deleteKeyword: (state) => {
			state.keyword = '';
		},
	},
});

export const { passKeyword, deleteKeyword } = keywordSlice.actions;
export default keywordSlice.reducer;
