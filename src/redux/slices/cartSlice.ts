import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TCartItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	size: number;
	type: string;
	count: number;
};

interface ICartSliceState {
	totalPrice: number;
	items: TCartItem[];
}

const initialState: ICartSliceState = {
	items: [],
	totalPrice: 0,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return sum + obj.price * obj.count;
			}, 0);
		},

		minusItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload);

			if (findItem) {
				findItem.count--;
			}
		},

		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},

		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const selectorCart = (state: RootState) => state.cart;

export const selectorCartItemById = (id: string) => (state: RootState) =>
	state.cart.items.find((obj) => obj.id === id);

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
