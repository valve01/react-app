import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})
// Импоритровали store в index.js и теперь смотрим что в нем. Всякие методы в нем. Нам пока понадобится только dispatch
console.log(store)