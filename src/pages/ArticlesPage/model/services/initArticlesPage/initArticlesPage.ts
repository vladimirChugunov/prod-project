import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article';
import {
    getArticlesPageInited,
    getArticlesPageNum,
} from '../../../model/selectors/ArticlesPageSelectors';
import { ArticlePageActions } from '../../../model/slices/articlePageSlice';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'articlePage/initArticlesPage',
    async (searchParams, thunkAPI) => {
        const { getState, dispatch } = thunkAPI;
        const inited = getArticlesPageInited(getState());
        const page = getArticlesPageNum(getState());
        if (!inited) {
            // Вытаскиваем все необходимые нам элементы из Url
            const orderFromUrl = searchParams.get('order') as SortOrder;
            const sortFromUrl = searchParams.get('sort') as ArticleSortField;
            const searchFromUrl = searchParams.get('search');
            // Сделать более атоматизированно чем if
            // передаем сохранненые значения в стейт с сортировкой, поиском
            if (orderFromUrl) {
                dispatch(ArticlePageActions.setOrder(orderFromUrl));
            }
            if (sortFromUrl) {
                dispatch(ArticlePageActions.setSort(sortFromUrl));
            }
            if (searchFromUrl) {
                dispatch(ArticlePageActions.setSearch(searchFromUrl));
            }

            //  если стейт проинициализированн то не вызываем повторный запрос
            dispatch(ArticlePageActions.initSate());
            dispatch(
                fetchArticlesList({
                    page,
                }),
            );
        }
    },
);
