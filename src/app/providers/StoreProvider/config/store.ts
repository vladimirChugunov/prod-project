// Импортируем конфиги из Redux Toolkit
import { configureStore, Reducer } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { CombinedState, ReducersMapObject } from 'redux';

import { $api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

// создаем функцию для переиспользования в сторибуке и тестов jest
export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducers: ReducersMapObject<StateSchema> = { //  ReducersMapObject // тип reducer  из configureStore
        ...asyncReducers, // передаем ассинхронные редьюссеры, для StoreDecorator
        counter: counterReducer,
        user: userReducer,
    };
    // Ассинхронные редьюсеры
    const reducerManager = createReducerManager(rootReducers); // createReducerManager ассинхронная подгрузка. передаем список корневых редьюсеров, тоесть всех которые у нас есть

    const extraArg: ThunkExtraArg = { // лучше выносить иначе ошибки ts вообще не понятные для api и navigate
        api: $api, // передаем instance axios с базовым url
        navigate, // для навигации порсле (например редирект после закрытия модалки входа)
    };

    // Настраиваем конфиги redux Toolkit, тут создается стор
    const store = configureStore({ // Передаем общие типы из всех слайсов тип ReducersMapObject
        // тут передаем существующие в проекте редьюсеры
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>, // кастуем as as Reducer<CombinedState<StateSchema>>, так как у нас не соответствие типов редьюссера, так-как функция reducerManager.reduce возвращает нам ReducerManager.reduce CombinedState<StateSchema> , а сам редьюссер возвращает не комбайн , апросто Reducer туда и передаем наш комбайн редьюссер CombinedState<StateSchema>
        devTools: __IS_DEV__, // отключаем devTools в продакшене
        preloadedState: initialState,
        // у thunkAPI есть аргумент extra в которые мы можем положить вспомогательные функции,данные
        // туда и будем помещать instance axios (extraArg), для того чтобы не вызывать его в путях(url) в асинхронных запросах постоянно
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });
    // @ts-ignore
    store.reducerManager = reducerManager; //  добавляем в стор reducerManager

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'] // создаем тип диспатч, чтобы все типы для всех экшенов автоматически подтягивались

// // Выведите типы RootState и AppDispatch из самого магазина.
// export type RootState = ReturnType<typeof store.getState>
// // Предполагаемый тип: {сообщения: PostsState, комментарии: CommentsState, пользователи: UsersState}
// export type AppDispatch = typeof store.dispatch  // без нашей функции враппера createReduxStore
