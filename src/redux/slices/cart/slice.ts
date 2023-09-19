import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../../utils/getCartFromLocalStorage';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { ICartSliceState, TCartItem } from './types';



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



export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;