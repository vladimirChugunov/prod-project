import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';
import { AnyAction, EnhancedStore, Reducer } from '@reduxjs/toolkit';
import { CombinedState, ReducersMapObject } from 'redux';

// Тут объеденяем все типы из созданых слайсов, общий тип, плюс есть понятное описание
export interface StateSchema {
    counter: CounterSchema
    user: UserSchema
    // Асснихронные редьюсеры
    loginForm?: LoginSchema // опциональный для ассинхроной подгрузки
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager // указываем дополнительное поле, мы его сами добавили нужно расширить типы стора
}
