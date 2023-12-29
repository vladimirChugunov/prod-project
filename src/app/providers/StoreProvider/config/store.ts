// Импортируем конфиги из Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import { counterReduces } from 'entities/Counter';
import { StateSchema } from './StateSchema';

// создаем функцию для переиспользования в сторибуке и тестов jest
export function createReduxStore(initialState?: StateSchema) {
// Настраиваем конфиги redux Toolkit
    return configureStore<StateSchema>({ // Передаем общие типы из всех слайсов
        reducer: { counter: counterReduces }, // тут передаем существующие в проете редьюсеры
        devTools: __IS_DEV__, // отключаем devTools в продакшене
        preloadedState: initialState,
    });
}

// // Выведите типы RootState и AppDispatch из самого магазина.
// export type RootState = ReturnType<typeof store.getState>
// // Предполагаемый тип: {сообщения: PostsState, комментарии: CommentsState, пользователи: UsersState}
// export type AppDispatch = typeof store.dispatch
