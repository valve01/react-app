import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	items: [],
	totalPrice: 0,
};
export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// // Добавление в корзину в главном меню
		// addItem(state, action) {
		// 	state.items.push(action.payload);
		// 	// При добавлении товара сразу вычисляем общую стоимость товаров в корзине, используем для этого метод reduce
		// 	state.totalPrice = state.items.reduce((sum, obj) => {
		// 		return sum + obj.price;
		// 	}, 0);
		// },

		// Добавление в корзину в главном меню
		addItem(state, action) {
			// Ищем элемент в массиве, и если находим добавляем ему к счетчику +1, иначе добавляем его в корзину и устанавливаем счетчик = 1

			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({...action.payload, count: 1 });
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return sum + obj.price;
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
