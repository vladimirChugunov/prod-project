import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    Array<Comment>,
    string | undefined,
    ThunkConfig<string>
>(
    'articleDetailsPage/fetchCommentsByArticleId',
    async (articleId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        if (!articleId) {
            return rejectWithValue('Error');
        }

        try {
            const response = await extra.api.get<Array<Comment>>('/comments', {
                params: {
                    articleId, // query параметры передаем
                    _expand: 'user', // расширяем инфой о user
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
