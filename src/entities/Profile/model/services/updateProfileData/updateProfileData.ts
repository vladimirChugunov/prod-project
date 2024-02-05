import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { validateProfileData } from 'entities/Profile/model/services/validateProfileData/validateProfileData';
import { Profile, ValidateProfileError } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<Array<ValidateProfileError>>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI; // 3 Аргументом принимаем функцию getSate там получаем наш стейт в данном случае данные пользователя

        const formData = getProfileForm(getState()); // Добавляем стейт в селектор getProfileForm // тут мы получаем стейт с введеными полями ф форме например

        const errors = validateProfileData(formData); // передаем стейт что-бы посомтерь есть ли ошибки в нем в функции проверяем, сюда мы передаем измененный стейт в рантайме и валидируем

        if (errors.length) {
            return rejectWithValue(errors); // если есть хотя-бы одна ошибка завершаем санку с rejectWithValue(errors)
        }
        console.log(formData?.id);
        try {
            const response = await extra.api.put<Profile>(
                `/profile/${formData?.id}`,
                formData,
            );

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
