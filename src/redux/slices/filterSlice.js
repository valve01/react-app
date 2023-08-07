import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	sortType: { name: 'популярности (сначала популярные)', sortProperty: 'rating' },
	activeCategory: 0,
	currentPage: 1,
	searchValue: '',
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
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
		setFilters(state, action) {
			state.currentPage = Number(action.payload.currentPage) ;
			state.activeCategory = Number(action.payload.activeCategory) ;
			state.sortType= action.payload.sortType;
			// console.log(action.payload)
		},
	},
});

export const selectorSort = (state) => state.filter.sortType;

export const { setActiveCategory, setActiveSortType, setCurrentPage, setSearchValue, setFilters } =
	filterSlice.actions;

export default filterSlice.reducer;
