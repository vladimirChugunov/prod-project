import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, ArticleType } from 'entities/Article';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import {
    getArticlesPageLimit,
    getArticlesSearch,
    getArticlesSort,
    getArticlesSortOrder,
    getArticleType,
} from '../../selectors/ArticlesPageSelectors';

interface FetchArticlesListProps {
    page?: number,
    replace?: boolean; // для получения всех данных, а нет толкьо последних подгруженных selectAll а не addMany // заменяем
    // можно передать с помощью пропсов, но чтобы не прокидывать аргументы
    // лучше вытащить из state
    // search?: string,
    // order: SortOrder,
    // sort: ArticleSortField
}

export const fetchArticlesList = createAsyncThunk<
    Array<Article>,
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlePage/fetchArticlesList.ts',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const { page } = props; // пример передачи пропсом
        const limit = getArticlesPageLimit(getState());
        // Вытаскиваем данные из стет, чтобы не передавать пропсами
        const sort = getArticlesSort(getState());
        const order = getArticlesSortOrder(getState());
        const search = getArticlesSearch(getState());
        const type = getArticleType(getState());

        try {
            // сохраняем значения query параметров, что-бы при обновлении они сохранялись // стандартное API браузера используем
            // window.history.pushState(null, '', `?search=${search}`); мы его вынесли в хук addQueryParams
            addQueryParams({ // нужно еще лимит передавать и что у нас в строке запроса, в нашем случае лимит фиксированный
                sort, order, search, type,
            });
            const response = await extra.api.get<Array<Article>>('/articles', {
                params: {
                    _expand: 'user', // нужно что-бы отресовывать аватарку пользователя, для view big
                    _page: page,
                    _limit: limit,
                    _sort: sort,
                    _order: order,
                    q: search,
                    type: type === ArticleType.ALL ? undefined : type,
                },
            });

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
