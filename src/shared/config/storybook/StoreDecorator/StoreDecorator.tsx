import { StoryFn } from '@storybook/react';
import { Suspense } from 'react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';

export const StoreDecorator = (initialState: DeepPartial<StateSchema>) => (StoryComponent: StoryFn) => (
    <StoreProvider initialState={initialState}>
        <Suspense fallback="">
            <StoryComponent />
        </Suspense>
    </StoreProvider>
);
