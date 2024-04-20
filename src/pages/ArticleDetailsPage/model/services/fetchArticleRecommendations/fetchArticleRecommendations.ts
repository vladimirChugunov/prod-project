import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface fetchArticleRecommendationsProps {
    page?: number;
    replace?: boolean; // для получения всех данных, а нет толкьо последних подгруженных selectAll а не addMany // заменяем
    // можно передать с помощью пропсов, но чтобы не прокидывать аргументы
    // лучше вытащить из state
    // search?: string,
    // order: SortOrder,
    // sort: ArticleSortField
}

export const fetchArticleRecommendations = createAsyncThunk<
    Array<Article>,
    void,
    ThunkConfig<string>
>(
    'articleDetailPage/fetchArticleRecommendations.ts',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Array<Article>>('/articles', {
                params: {
                    _limit: 4,
                },
            });

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
