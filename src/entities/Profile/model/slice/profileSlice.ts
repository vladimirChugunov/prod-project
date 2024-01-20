import { createSlice } from '@reduxjs/toolkit';
import { ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    isLoading: false,
    error: undefined,
    readonly: false,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {},
});

export const { actions: profileAction } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
