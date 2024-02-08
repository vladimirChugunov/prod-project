import { useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import {
    getArticlesPageInited,
    getArticlesPageNum,
} from '../../../model/selectors/ArticlesPageSelectors';
import { ArticlePageActions } from '../../../model/slices/articlePageSlice';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('articlePage/initArticlesPage', async (_, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;
    const inited = getArticlesPageInited(getState());
    const page = getArticlesPageNum(getState());
    if (!inited) {
    //  если стейт проинициализированн то не вызываем повторный запрос
        dispatch(ArticlePageActions.initSate());
        dispatch(
            fetchArticlesList({
                page,
            }),
        );
    }
});
