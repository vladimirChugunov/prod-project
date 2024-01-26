import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Profile } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI; // 3 Аргументом принимаем функцию getSate там получаем наш стейт в данном случае данные пользователя

        const formData = getProfileForm(getState()); // Добавляем стейт в селектор getProfileForm

        try {
            const response = await extra.api.put<Profile>('/profile', formData);

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
