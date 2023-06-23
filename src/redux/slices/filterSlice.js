import { createSlice } from '@reduxjs/toolkit'

// В объект initialState можно записать любые данные в любом количестве
const initialState = {
  count: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
	// reducers содержит объект state, в котором начальное значение == initialState. Передаем state в стрелочную ф-цию и методы могут спокойно обращаться теперь к свойствам state
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
// Экспортируем экшены для изменения state
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer