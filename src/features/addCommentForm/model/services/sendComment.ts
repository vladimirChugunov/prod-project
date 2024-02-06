import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Comment } from 'entities/Comment';
import { getUserData } from 'entities/User';
import { articleDetailsData } from 'entities/Article';
import { addCommentFormAction } from 'features/addCommentForm/model/slice/AddCommentFormSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addCommentFormText } from '../../model/selector/addCommentFormSelectors';

export const sendComment = createAsyncThunk<Comment, void, ThunkConfig<string>>(
    'addCommentForm/sendComment',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI; // 3 Аргументом принимаем функцию getSate там получаем наш стейт в данном случае данные пользователя
        // Достаем из селекторов нужные нам данные
        const userData = getUserData(getState()); // проверка авторизации пользователя и его данные
        const text = addCommentFormText(getState());
        const article = articleDetailsData(getState());
        const dispatch = useAppDispatch();

        if (!userData || !text || !article) {
            return rejectWithValue('NO DATA');
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text,
            });
            dispatch(addCommentFormAction.setText(''));
            return response.data;
        } catch (e) {
            return rejectWithValue('Error');
        }
    },
);
