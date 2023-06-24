import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	sortType: { name: ' популярности (сначала популярные)', sortProperty: 'rating' },
	activeCategory: 0,
};
export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		// Можно сразу вот так методы тут создавать
		setActiveCategory(state, action) {
			// При вызове нашего метода в нужных компонентах в него будет передан неявно объект action, который содержит в себе type - тип действия, и payload - остальные данные, обычно какое-то значение. А мы его в принимает тут, этот action.
			console.log(action)
			state.activeCategory = action.payload;
		},
	},
});

export const {setActiveCategory,} = filterSlice.actions;

export default filterSlice.reducer;
