// Функция создания слайсов
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { User, UserSchema } from '../type/userSchema';

// Начальное значние и применяем тип из modal/type
const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => { // если пользователь закрыл страницу и открыл, то берем данные из локал сторадж и кладем их обратно
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) { // если есть user в колкал сторадж кладем его в стейт
                state.authData = JSON.parse(user);
            }
            state._inited = true;
        },
        logout: (state) => { // если пользователь закрыл страницу и открыл, то берем данные из локал сторадж и кладем их обратно
            state.authData = undefined; // очищаем стейт
            state._inited = false;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY); // Очищаем локал стораж
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice; // Чистая функция которая примнимает стейт и 2 аргументом action для его изменения
