import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


//
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
		setActiveCategory(state, action: PayloadAction<number>) {
			state.activeCategory = action.payload;
		},
		setActiveSortType(state, action: PayloadAction<TSortProperty>) {
			state.sortType = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setFilters(state, action: PayloadAction<IFilterSliceState>) {
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
