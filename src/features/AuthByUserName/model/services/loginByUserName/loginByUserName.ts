import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { ThunkExtraArg } from 'app/providers/StoreProvider';

interface LoginByUserNameProps {
  userName: string;
  password: string;
}

// createAsyncThunk, это криейтор который после вызова возвращает action
// происходит 3 вызова dispatch 1 при вызове loginByUserName

// создаем thunk ассинхронный при помощи createAsyncThunk.
export const loginByUserName = createAsyncThunk<
  User,
  LoginByUserNameProps,
  {
    rejectValue: string;
    extra: ThunkExtraArg;
  }
>( // User  : то что должно вернуться с бека(тип), LoginByUserNameProps(тип) что передаем из нашей формы на клиенте в модалке. 3 аргумент типизация того, что возвращаем нам thunkAPI его функций
    'login/loginByUserName', // описание action, для девтулзов
    async (authData, thunkAPI) => {
    // thunkAPI внутри содержится Api самого Thunk с функциями: для обработки ошибок, вызова другого actions и другое  // authData = LoginByUserNameProps запрос на сервак
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<User>('/login', authData); // отправляем запрос на сервер с полями userName и password, <User> типизируем ответ с сервера
            if (!response.data) {
                // если с сервера ничего не вернулось обрабатываем ошибку
                throw new Error();
            }
            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                JSON.stringify(response.data),
            ); // кладем данные в локал сторадж типо токен
            // происходит 3 вызова dispatch 2 при изменении стейта
            dispatch(userActions.setAuthData(response.data)); // заполняем стейт юзера возвращаемыми значениями с бека id, userName
            // происходит 3 вызова dispatch 3 при return
            // Редирект на /about после логина формы
            // так делать нельзя иначе стет будет инициализироваться постоянно при каждом переходе по страницам
            /// extra.navigate?.('/about');
            return response.data; // данные которые мы вернули, потом измпользуем с slice
        } catch (e) {
            console.log(e);
            return rejectWithValue('error'); // вызываем из thunkAPI, rejectWithValue для обработки ошибки
        }
    },
);

// без логики instance axios
// export const loginByUserName = createAsyncThunk<User, LoginByUserNameProps, { rejectValue: string }>( // создаем thunk ассинхронный при помощи createAsyncThunk.
// // User : то что должно вернуться с бека, LoginByUserNameProps что передаем из нашей формы на клиенте в модалке. 3 аргумент типизация того, что возвращаем нам thunkAPI его функций
//     'login/loginByUserName', // описание action, для девтулзов
//     async (authData, thunkAPI) => { // thunkAPI внутри содержится Api самого Thunk с функциями: для обработки ошибок, вызова другого actions и другое  // authData = LoginByUserNameProps запрос на сервак
//         try {
//             const response = await axios.post<User>('http://localhost:8000/login', authData); // отправляем запрос на сервер с полями userName и password, <User> типизируем ответ с сервера
//
//             if (!response.data) { // если с сервера ничего не вернулось обрабатываем ошибку
//                 throw new Error();
//             }
//             localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data)); // кладем данные в локал сторадж типо токен
//             // происходит 3 вызова dispatch 2 при изменении стейта
//             thunkAPI.dispatch(userActions.setAuthData(response.data)); // заполняем стейт юзера возвращаемыми значениями с бека id, userName
//             // происходит 3 вызова dispatch 3 при return
//             return response.data;
//         } catch (e) {
//             console.log(e);
//             return thunkAPI.rejectWithValue('error'); // вызываем из thunkAPI, rejectWithValue для обработки ошибки
//         }
//     },
// );
