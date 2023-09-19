import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cart/slice';
import pizzasReducer from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		cart: cartReducer,
		pizzas: pizzasReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// Раньше в документации было так
// export const useAppDispatch = () => useDispatch<AppDispatch>();
