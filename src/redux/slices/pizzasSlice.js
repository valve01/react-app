import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	items: [],
};
export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		// Добавление в корзину в главном меню
		setItems(state, action) {
			state.items = action.payload;
		},
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
