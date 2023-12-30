// Функция создания слайсов
import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../type/userSchema';

// Начальное значние и применяем тип из modal/type
const initialState: UserSchema = {};

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice; // Чистая функция которая примнимает стейт и 2 аргументом action для его изменения
