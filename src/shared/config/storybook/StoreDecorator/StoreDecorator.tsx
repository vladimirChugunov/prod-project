import { StoryFn } from '@storybook/react';
import { Suspense } from 'react';
import { DeepPartial } from '@reduxjs/toolkit';
import { ReducersMapObject } from 'redux';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import { profileReducer } from 'entities/Profile';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
    profile: profileReducer,
};

export const StoreDecorator = (
    initialState: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => (StoryComponent: StoryFn) => (
    <StoreProvider initialState={initialState} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <Suspense fallback="">
            <StoryComponent />
        </Suspense>
    </StoreProvider>
);
