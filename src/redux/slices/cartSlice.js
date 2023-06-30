import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	items: [],
	totalPrice: 0,
};
export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// Добавление в корзину в главном меню
		addItem(state, action) {
			state.items.push(action.payload);
		},
		// Удаление всех товаров данного типа из корзины(Крестик напротив элемента в корзине)
		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		// Полная очистка корзины
		clearItems(state) {
			state.items = [];
		},
		// Общая стоимость товаров в корзине
		setTotalPrice(state, action) {
			state.totalPrice = action.payload;
		},
	},
});

export const { addItem, removeItem, clearItems, setTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;
