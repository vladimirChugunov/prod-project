// Импортируем конфиги из Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { ReducersMapObject } from 'redux';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

// создаем функцию для переиспользования в сторибуке и тестов jest
export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = { //  ReducersMapObject // тип reducer  из configureStore
        ...asyncReducers, // передаем ассинхронные редьюссеры, для StoreDecorator
        counter: counterReducer,
        user: userReducer,
    };
    // Ассинхронные редьюсеры
    const reducerManager = createReducerManager(rootReducers); // передаем список корневых редьюсеров, тоесть всех которые у нас есть

    // Настраиваем конфиги redux Toolkit, тут создается стор
    const store = configureStore<StateSchema>({ // Передаем общие типы из всех слайсов тип ReducersMapObject
        reducer: reducerManager.reduce, // тут передаем существующие в проекте редьюсеры
        devTools: __IS_DEV__, // отключаем devTools в продакшене
        preloadedState: initialState,
    });
    // @ts-ignore
    store.reducerManager = reducerManager; //  добавляем в стор reducerManager

    return store;
}

// // Выведите типы RootState и AppDispatch из самого магазина.
// export type RootState = ReturnType<typeof store.getState>
// // Предполагаемый тип: {сообщения: PostsState, комментарии: CommentsState, пользователи: UsersState}
// export type AppDispatch = typeof store.dispatch
