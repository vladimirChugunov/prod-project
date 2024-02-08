import { AnyAction, EnhancedStore, Reducer } from '@reduxjs/toolkit';
import { CombinedState, ReducersMapObject } from 'redux';
import { AxiosInstance } from 'axios';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';
import { ProfileSchema } from 'entities/Profile';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ArticlesPageSchema } from 'pages/ArticlesPage';

// Тут объеденяем все типы из созданых слайсов, общий тип, плюс есть понятное описание
export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  // Асснихронные редьюсеры
  loginForm?: LoginSchema; // опциональный для ассинхроной подгрузки
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  ArticleDetailsComments?: ArticleDetailsCommentsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlesPageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  // true - вмонтирован false демонтирован //  некоторые редьюссеры не обязательные для этого свои тип OptionalRecord
  // какие-то монтируем какие-то демотируем
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager; // указываем дополнительное поле, мы его сами добавили нужно расширить типы стора
}

// Тип для кастомных extra в thunkAPI.extra
export interface ThunkExtraArg {
  api: AxiosInstance;
  // navigate?: (to: To, options?: NavigateOptions) => void,
}

// Для типизации ThunkAPI
export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
