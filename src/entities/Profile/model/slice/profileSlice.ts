import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { Profile, ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    isLoading: false,
    error: undefined,
    readonly: true,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => { // сбрасываем все то что навводили внутри инпута
            state.readonly = true; // при нажатии кнопки отмена мы возвращаем состояние readonly
            state.form = state.data; // возвращаем значения которое мы получили с сервера
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },

    extraReducers: (builder) => {
        // работатем с нашей санкой из нее мы получаем несколько состояний pending,fulfilled, rejected
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = action.payload;
                // Нужно для избежания дублирования запросов,
                // записываем data в form, для того что-бы при вводе чего-то в форму менялся только стейт form, а не data , чтобы небыло перезапросов на сервер
                // data c сервера получили сохранили и потом уже ни как не меняем, а form будет меняться при вводе чего-то в инпут, изменении значений
                state.form = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly = true;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: profileAction } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
