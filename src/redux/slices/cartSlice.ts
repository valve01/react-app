import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLocalStorage';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

export type TCartItem = {
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

const { items, totalPrice } = getCartFromLS();

const initialState: ICartSliceState = {
	items,
	totalPrice,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<TCartItem>) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = calcTotalPrice(state.items);
		},

		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);

			if (findItem) {
				findItem.count--;
			}
			state.totalPrice = calcTotalPrice(state.items);
		},

		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
			state.totalPrice = calcTotalPrice(state.items);
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
