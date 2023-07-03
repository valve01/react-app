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
			// При добавлении товара сразу вычисляем общую стоимость товаров в корзине, используем для этого метод reduce
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price + sum;
			}, 0);
		},
		// Удаление всех товаров данного типа из корзины(Крестик напротив элемента в корзине)
		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		// Полная очистка корзины
		clearItems(state) {
			state.items = [];
		},
	},
});

export const { addItem, removeItem, clearItems, setTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;
