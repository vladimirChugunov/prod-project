import { AnyAction, EnhancedStore, Reducer } from '@reduxjs/toolkit';
import { CombinedState, ReducersMapObject } from 'redux';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';
import { ProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router';

// Тут объеденяем все типы из созданых слайсов, общий тип, плюс есть понятное описание
export interface StateSchema {
    counter: CounterSchema
    user: UserSchema
    // Асснихронные редьюсеры
    loginForm?: LoginSchema // опциональный для ассинхроной подгрузки
    profile?: ProfileSchema
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

// Тип для кастомных extra в thunkAPI.extra
export interface ThunkExtraArg {
    api: AxiosInstance
    navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
    rejectValue: T,
    extra: ThunkExtraArg
}
