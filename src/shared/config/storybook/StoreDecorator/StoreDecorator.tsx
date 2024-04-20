import { StoryFn } from '@storybook/react';
import { Suspense } from 'react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import { profileReducer } from 'entities/Profile';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { addCommentFormReducer } from 'features/addCommentForm/model/slice/AddCommentFormSlice';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices';
import { ReducerList } from '../../../lib/components/DynamicModuleLoader';

const defaultAsyncReducers: ReducerList = {
    loginForm: loginReducer, // не забываем добавлять вновь добавленные ассинхронные редьюссеры
    profile: profileReducer, // не забываем добавлять вновь добавленные ассинхронные редьюссеры
    articleDetails: articleDetailsReducer, // не забываем добавлять вновь добавленные ассинхронные редьюссеры
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
    // новый редюессер
};

// Нужен для работы со стором в сторибуке!!! Не забываем в компонете приложения отключать запрос на сервер при просморе компонета через сторибук! __PROJECT__ !== 'storybook'
// eslint-disable-next-line max-len
export const StoreDecorator = (initialState: DeepPartial<StateSchema>, asyncReducers?: ReducerList) => (StoryComponent: StoryFn) => (
    <StoreProvider
        initialState={initialState}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
        <Suspense fallback="">
            <StoryComponent />
        </Suspense>
    </StoreProvider>
);
