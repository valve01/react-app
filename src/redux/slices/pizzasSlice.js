import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzasFromRedux = createAsyncThunk(
	'pizzas/fetchPizzasFromReduxStatus',
	// 	async ({ category, sort, order, filter, currentPage }) => {
	async (params, thunkAPI) => {
		const { category, sort, order, filter, currentPage } = params;
		const { data } = await axios.get(
			`https://64845cf9ee799e3216269459.mockapi.io/items?${category}&sortBy=${sort}&order=${order}&filter=${filter}&page=${currentPage}&limit=4`,
		);
		console.log(thunkAPI);
		console.log(thunkAPI.requestId);
		console.log(thunkAPI.getState().filter.currentPage);

		if (data.length === 0) {
			// То что мы передадим в методы ниже пойдет в action.payload
			return thunkAPI.rejectWithValue('Питсы пустые');
		}
		return thunkAPI.fulfillWithValue(data);
	},
);

const initialState = {
	items: [],
	// свойством status заменим state isLoading в Home.jsx
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
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchPizzasFromRedux.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = 'success';
				console.log(action, 'fullfiled');
			})
			.addCase(fetchPizzasFromRedux.rejected, (state, action) => {
				state.status = 'error';
				state.items = [];
				console.log(action, 'rejected');
				console.log(action.payload);
			});
	},
	// Удаляем state isLoading из Home.jsx
});

// export const { setItems } = pizzasSlice.actions;
export const selectorFilter = (state) => state.filter
export const selectorPizzas = (state) => state.pizzas

export default pizzasSlice.reducer;
