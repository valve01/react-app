import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TSortProperty = {
	name: string;
	sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
};

interface IFilterSliceState {
	sortType: TSortProperty;
	activeCategory: number;
	currentPage: number;
	searchValue: string;
}

const initialState: IFilterSliceState = {
	sortType: { name: 'популярности (сначала популярные)', sortProperty: 'rating' },
	activeCategory: 0,
	currentPage: 1,
	searchValue: '',
};
export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setActiveCategory(state, action) {
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
			state.currentPage = Number(action.payload.currentPage);
			state.activeCategory = Number(action.payload.activeCategory);
			state.sortType = action.payload.sortType;
		},
	},
});

export const selectorSort = (state: RootState) => state.filter.sortType;

export const { setActiveCategory, setActiveSortType, setCurrentPage, setSearchValue, setFilters } =
	filterSlice.actions;

export default filterSlice.reducer;
