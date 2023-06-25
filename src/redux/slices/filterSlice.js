import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	sortType: { name: 'популярности (сначала популярные)', sortProperty: 'rating' },
	activeCategory: 0,
};
export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		// Можно сразу вот так методы тут создавать
		setActiveCategory(state, action) {
			// При вызове нашего метода в нужных компонентах в него будет передан неявно объект action, который содержит в себе type - тип действия (это самому редаксу нужно), и payload - то что мы передали, обычно какое-то значение. А мы его принимаем тут, этот action и извлекаем из него переданное значение
			// console.log(action);
			state.activeCategory = action.payload;
		},
		setActiveSortType(state, action) {
			state.sortType = action.payload;
			// console.log(action);
		},
	},
});

export const { setActiveCategory, setActiveSortType } = filterSlice.actions;

export default filterSlice.reducer;
