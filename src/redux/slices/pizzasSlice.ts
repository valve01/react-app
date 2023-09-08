import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchPizzasFromRedux = createAsyncThunk(
	'pizzas/fetchPizzasFromReduxStatus',

	async (params, thunkAPI) => {
		const { category, sort, order, filter, currentPage } = params;
		const { data } = await axios.get(
			`https://64845cf9ee799e3216269459.mockapi.io/items?${category}&sortBy=${sort}&order=${order}&filter=${filter}&page=${currentPage}&limit=4`,
		);


		if (data.length === 0) {

			return thunkAPI.rejectWithValue('Питсы пустые');
		}
		return thunkAPI.fulfillWithValue(data);
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


	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzasFromRedux.pending, (state) => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchPizzasFromRedux.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = 'success';

			})
			.addCase(fetchPizzasFromRedux.rejected, (state, action) => {
				state.status = 'error';
				state.items = [];

			});
	},

});


export const selectorFilter = (state:RootState) => state.filter
export const selectorPizzas = (state:RootState) => state.pizzas

export default pizzasSlice.reducer;
