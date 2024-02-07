import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { getArticlesPageLimit } from '../../selectors/ArticlesPageSelectors';

interface FetchArticlesListProps {
    page?: number,
}

export const fetchArticlesList = createAsyncThunk<
    Array<Article>,
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlePage/fetchArticlesList.ts',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const { page } = props;
        const limit = getArticlesPageLimit(getState());

        try {
            const response = await extra.api.get<Array<Article>>('/articles', {
                params: {
                    _expand: 'user', // нужно что-бы отресовывать аватарку пользователя, для view big
                    _page: page,
                    _limit: limit,
                },
            });

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
