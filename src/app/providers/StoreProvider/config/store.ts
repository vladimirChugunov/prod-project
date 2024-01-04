// Импортируем конфиги из Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { ReducersMapObject } from 'redux';
import { loginReducer } from 'features/AuthByUserName';
import { StateSchema } from './StateSchema';

// создаем функцию для переиспользования в сторибуке и тестов jest
export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = { //  ReducersMapObject // тип reducer  из configureStore
        counter: counterReducer, user: userReducer, loginForm: loginReducer,
    };

    // Настраиваем конфиги redux Toolkit
    return configureStore<StateSchema>({ // Передаем общие типы из всех слайсов тип ReducersMapObject
        reducer: rootReducers, // тут передаем существующие в проекте редьюсеры
        devTools: __IS_DEV__, // отключаем devTools в продакшене
        preloadedState: initialState,
    });
}

// // Выведите типы RootState и AppDispatch из самого магазина.
// export type RootState = ReturnType<typeof store.getState>
// // Предполагаемый тип: {сообщения: PostsState, комментарии: CommentsState, пользователи: UsersState}
// export type AppDispatch = typeof store.dispatch
