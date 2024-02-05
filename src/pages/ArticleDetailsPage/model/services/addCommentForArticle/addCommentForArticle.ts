import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { getUserData } from 'entities/User';
import { articleDetailsData } from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkAPI; // thunkAPI работа со стейтом, можем домтать все функции работы со стейтом
        // Достаем из селекторов нужные нам данные
        const userData = getUserData(getState()); // проверка авторизации пользователя и его данные
        const article = articleDetailsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue('NO DATA');
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(fetchCommentsByArticleId(article.id)); //  dispatch достаем из thunkApi

            return response.data;
        } catch (e) {
            return rejectWithValue('Error');
        }
    },
);
