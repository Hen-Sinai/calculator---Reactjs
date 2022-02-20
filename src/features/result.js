import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { expression: '' };

export const resultSlice = createSlice({
	name: 'result',
	initialState: { value: initialStateValue },
	reducers: {
		asm: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { asm } = resultSlice.actions;

export default resultSlice.reducer;
