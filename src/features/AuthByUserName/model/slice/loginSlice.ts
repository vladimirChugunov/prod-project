import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByUserName } from '../services/loginByUserName/loginByUserName';
import { LoginSchema } from '../type/loginSchema';

const initialState: LoginSchema = {
    isLoading: false,
    userName: '',
    password: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => { // записываем в state, action/payload который получили из компонета. PayloadAction<тут пишем тип того что нам пришло(payload)>
            state.userName = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    // нужен для изменения состояния AsyncThunk , после ассинхронных изменений состояния (запрос на сервак)
    // Тут мы записываем в стейт данные из AsyncThunk, то что мы вернули из ассинхронных action
    extraReducers: (builder) => {
        // работатем с нашей санкой из нее мы получаем несколько состояний pending,fulfilled, rejected
        builder
            .addCase(loginByUserName.pending, (state) => {
                state.error = undefined; // запрос выполняется state.error = undefined, не нет ошибки
                state.isLoading = true; // запрос выполняется isLoading = true
            })
            .addCase(loginByUserName.fulfilled, (state, action) => {
                state.isLoading = false; // загрузка законченна
            })
            .addCase(loginByUserName.rejected, (state, action) => { // данные которые мы вернули из AsyncThunk попадают в этот action
                state.isLoading = false; // произогла ошибка загрузка закончена
                // если мы хотим установить error мы достаем его из того , что вернул нам AsyncThunk и кладем в стейт
                state.error = action.payload; // тут тип будет стринг, так как мы задали этот возвращаемый тип ошибки в AsyncThunk { rejectValue: string }
            });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
