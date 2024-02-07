import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const fetchArticlesList = createAsyncThunk<
    Array<Article>,
    void,
    ThunkConfig<string>
>(
    'articlePage/fetchArticlesList.ts',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.get<Array<Article>>('/articles', {
                params: {
                    _expand: 'user', // нужно что-бы отресовывать аватарку пользователя, для view big
                },
            });

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
