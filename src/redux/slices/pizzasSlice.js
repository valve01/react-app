import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// Теперь скажем чтобы наш слайс делал асинхронный экшн
// Создаем асинхронный экшн. Задаем ему имя, экспортируем и вызываем метод createAsyncThunk
export const fetchPizzas = createAsyncThunk(
	// Этот метод принимает 1 параметром - название(для использования внутри reducers) (тип экшена): name(название нашего слайса pizzasSlice)/(название нашего экшена (обзываем как хотим))
	'pizzas/fetchPizzasStatus',
	// Создаем асинхронную анонимную функцию
	async (params) => {
		const { category, sort, order, filter, currentPage } = params;
		// В ней пишем наш запрос
		const { data } = await axios.get(
			`https://64845cf9ee799e3216269459.mockapi.io/items?${category}&sortBy=${sort}&order=${order}&filter=${filter}&page=${currentPage}&limit=4`,
		);
		// И возвращаем его
		return data;
	},
);

const initialState = {
	items: [],
};

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		// Добавление в корзину в главном меню
		setItems(state, action) {
			state.items = action.payload;
		},
		extraReducers: {
			[fetchPizzas.fulfilled]: (state, action) => {
				console.log(state);
			},
			[fetchPizzas.pending]: (state, action) => {
				console.log("отправка");
			},
			[fetchPizzas.rejected]: (state, action) => {
				console.log("не получилось");
			},
		},
	},
});

// export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
