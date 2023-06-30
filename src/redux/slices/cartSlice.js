import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	items: [],
	totalPrice: 1,
};
export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			state.items.push(action.payload);
		},
		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItems(state) {
			state.items = [];
		},
		setTotalPrice(state, action) {
			state.totalPrice = action.payload;
		},
	},
});

export const { setActiveCategory, setActiveSortType, setCurrentPage } = cartSlice.actions;

export default cartSlice.reducer;
