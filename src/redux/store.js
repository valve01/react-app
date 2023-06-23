import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "./slices/filterSlice"
export const store = configureStore({
	reducer: { counter: counterReducer },
});
// Импоритровали store в index.js и теперь смотрим что в нем. Всякие методы в нем. Нам пока понадобится только dispatch
console.log(store);
