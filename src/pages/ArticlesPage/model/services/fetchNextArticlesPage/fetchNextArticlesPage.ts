import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { ArticlePageActions } from '../../../model/slices/articlePageSlice';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';
import {
    articlesPageIsLoading,
    getArticlesPageHasMore,
    getArticlesPageNum,
} from '../../../model/selectors/ArticlesPageSelectors';

export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('articlePage/fetchNextArticlesPage', async (_, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;
    const isLoading = articlesPageIsLoading(getState());
    const hasMore = getArticlesPageHasMore(getState());
    const page = getArticlesPageNum(getState());
    console.log(isLoading, hasMore, page, 'lkhfjergkuj');
    if (hasMore && !isLoading) {
        dispatch(ArticlePageActions.statePage(page + 1));
        dispatch(
            fetchArticlesList({
                page: page + 1,
            }),
        );
    }
});
