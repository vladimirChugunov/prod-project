import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';
import { ReducersMapObject } from 'redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { ReducerManager, StateSchemaKey } from './StateSchema';

// На вход принимаем дефолтные редьюсеры
// eslint-disable-next-line max-len
export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
    // Создаем корневой редьюсер
    const reducers = { ...initialReducers };
    // Добавляем редьюсеры в нашу функцию
    let combinedReducer = combineReducers(reducers);

    // Сюда добавляем редьюсеры для удаления если они нам не нужны в ассинхронной подгрузке
    let keysToRemove: Array<StateSchemaKey> = [];

    return {
        // Возвращаем редьюсеры
        getReducerMap: () => reducers,
        // Классическая функция редьюсер
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }
            return combinedReducer(state, action);
        },
        // Добавляем редьюсер по ключу
        add: (key: StateSchemaKey, reducer: Reducer) => { // Reducer тип из редакс
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;

            combinedReducer = combineReducers(reducers);
        },
        // Добвляет ключ в массив удаленных keysToRemove  и удалет ключ из редьюсерра
        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}
