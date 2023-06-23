import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/filterSlice';
// import counterReducer1 from "./slices/filterSlice1";
// import counterReducer2 from "./slices/filterSlice2";
// import counterReducer3 from "./slices/filterSlice3";
// import counterReducer4 from "./slices/filterSlice4";
export const store = configureStore({
	// Наше глобальное хранилище может содержать много разных редюсеров из разных слайсов
	reducer: {
		counter: counterReducer,
		
		// counterReducer:counterReducer
		// counterReducer
		// 
		// counter1: counterReducer1,
		// counter2: counterReducer2,
		// counter3: counterReducer3,
		// counter4: counterReducer4
	},
});
// Импоритровали store в index.js и теперь смотрим что в нем. Всякие методы в нем. Нам пока понадобится только dispatch
console.log(store);
