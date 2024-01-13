import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface LoginByUserNameProps {
    userName: string;
    password: string
}

export const loginByUserName = createAsyncThunk<User, LoginByUserNameProps, { rejectValue: string }>( // создаем thunk ассинхронный при помощи createAsyncThunk.
// User : то что должно вернуться с бека, LoginByUserNameProps что передаем из нашей формы на клиенте в модалке. 3 аргумент типизация того, что возвращаем нам thunkAPI его функций
    'login/loginByUserName', // описание action, для девтулзов
    async (authData, thunkAPI) => { // thunkAPI внутри содержится Api самого Thunk с функциями: для обработки ошибок, вызова другого actions и другое  // authData = LoginByUserNameProps запрос на сервак
        try {
            const response = await axios.post<User>('http://localhost:8000/login', authData); // отправляем запрос на сервер с полями userName и password, <User> типизируем ответ с сервера

            if (!response.data) { // если с сервера ничего не вернулось обрабатываем ошибку
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data)); // кладем данные в локал сторадж типо токен
            thunkAPI.dispatch(userActions.setAuthData(response.data)); // заполняем стейт юзера возвращаемыми значениями с бека id, userName

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error'); // вызываем из thunkAPI, rejectWithValue для обработки ошибки
        }
    },
);
