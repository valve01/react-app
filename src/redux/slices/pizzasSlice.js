import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzasFromRedux = createAsyncThunk(
	'pizzas/fetchPizzasFromReduxStatus',
	// 	async ({ category, sort, order, filter, currentPage }) => {
	async (params) => {
		const { category, sort, order, filter, currentPage } = params;
		const { data } = await axios.get(
			`https://64845cf9ee799e3216269459.mockapi.io/items?${category}&sortBy=${sort}&order=${order}&filter=${filter}&page=${currentPage}&limit=4`,
		);
		// console.log(data);
		return data;
	},
);

const initialState = {
	items: [],
	status: '',
};
export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},

	// extraReducers: {
	// 	[fetchPizzasFromRedux.fulfilled]: (state, action) => {
	// 		console.log(state);
	// 	},
	// },

	// Асинхронный экшн, созданный при помощи createAsyncThunk возвращает 3 события: pending, fulfilled, rejected, мы можем отловить их и использовать для навешивания действий по этим событиям в extraReducers через builder и addCase.
	// В action.payload будет храниться то что вернет функция fetchPizzasFromRedux, в нашем случае - переменная data
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzasFromRedux.pending, (state) => {
				state.status = 'Загружаю эту хуйню';
				state.items = [];
			})
			.addCase(fetchPizzasFromRedux.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = 'Наконец-то эта хуйня заработала';
			})
			.addCase(fetchPizzasFromRedux.rejected, (state) => {
				state.status = 'Хуйня не пашет';
				state.items = [];
			});
	},
});

// export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
