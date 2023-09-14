import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';


export type SearchPizzaParams = {
	search: string;
	category: string;
	sortBy: string;
	order: string;
	filter: string;
	currentPage: string;
};

export const fetchPizzasFromRedux = createAsyncThunk<PizzaItem[], Record<string, string>>(
	'pizzas/fetchPizzasFromReduxStatus',

	async (params, thunkAPI) => {
		const { category, sortBy, order, filter, currentPage } = params;
		const { data } = await axios.get<PizzaItem[]>(
			`https://64845cf9ee799e3216269459.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}&filter=${filter}&page=${currentPage}&limit=4`,
		);

		if (data.length === 0) {
			return thunkAPI.rejectWithValue('Питсы пустые');
		}
		return thunkAPI.fulfillWithValue(data);
	},
);

type PizzaItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
};

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface IPizzaSliceState {
	items: PizzaItem[];
	status: Status;
}

const initialState: IPizzaSliceState = {
	items: [],
	status: Status.LOADING,
};
export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzasFromRedux.pending, (state) => {
				state.status = Status.LOADING;
				state.items = [];
			})
			.addCase(fetchPizzasFromRedux.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = Status.SUCCESS;
			})
			.addCase(fetchPizzasFromRedux.rejected, (state, action) => {
				state.status = Status.ERROR;
				state.items = [];
			});
	},
});

export const selectorFilter = (state: RootState) => state.filter;
export const selectorPizzas = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;
