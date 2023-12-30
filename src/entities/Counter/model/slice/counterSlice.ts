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

export const { actions: counterActions } = counterSlice; // Action вызываем в компоненте изменяем increment/decrement
export const { reducer: counterReducer } = counterSlice; // Чистая функция которая примнимает стейт и 2 аргументом action для его изменения
