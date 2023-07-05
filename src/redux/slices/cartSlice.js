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
				// Не просто пушим объект из action.payload, а Берем все что нам пришло с компонента и в конец добавляем count:1 и пушим уже дополненный объект
				// ...action.payload - содержит весь объект, который мы добавляем (item) , но в деструктурированном виде, и мы просто дописываем ему еще одну пару ключ:значение - count: 1 и потом пушим это всё.
				state.items.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return sum + obj.price * obj.count;
			}, 0);
		},
		// Уменьшение кол-ва товаров в корзине
		minusItem(state, action) {
			// Ищем элемент в массиве, и если находим добавляем ему к счетчику +1, иначе добавляем его в корзину и устанавливаем счетчик = 1

			const findItem = state.items.find((obj) => obj.id === action.payload);
			// console.log(action.payload)
			if (findItem) {
				findItem.count--;
			}
		},

		// Удаление всех товаров данного типа из корзины (Крестик напротив элемента в корзине)
		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		// Полная очистка корзины
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
