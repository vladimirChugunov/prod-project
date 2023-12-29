// Функция создания слайсов
import { createSlice } from '@reduxjs/toolkit';
import { CounterSchema } from '../type/counterSchema';

// Начальное значние и применяем тип из modal/type
const initialState: CounterSchema = {
    value: 0,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: counterActions } = counterSlice;
export const { reducer: counterReduces } = counterSlice; // Чистая функция которая примнимает стейт и 2 аргументом action для его изменения
