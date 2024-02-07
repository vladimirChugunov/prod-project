// Нормальзация данных
// Функция, которая генерирует набор готовых редукторов и селекторов для выполнения операций CRUD над нормализованной структурой состояния ,
// содержащей экземпляры объекта данных определенного типа.
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import {
    fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

// сам добавить id сам нормальзует данные и добавит entities, он создает entities c массивом наших комментов [1,2,3] которые привязаны к id пользолвателя, а внутри лежит user
// тоесть для каждого id комментария у нас внутри лежит пользователь который создал (аватарка, имя) его и сам комментарий и в fetchCommentsByArticleId мы передали id статьи,
// он привяжется конкретно к этой статье!!!
const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id, // реализуем функцию получения id поля по которому пойдет нормальзация
});

// Создаем селектор по которому мы будем получать комментарии
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    // возвращаем стейт state.ArticleDetailsComments и initial state commentsAdapter.getInitialState()
    (state) => state.ArticleDetailsComments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
        isLoading: false,
        errors: undefined,
        ids: [],
        entities: {},
    }), // передаем initial state адампторы в которым мы получаем id
    reducers: {},
    extraReducers: (builder) => {
        // работатем с нашей санкой из нее мы получаем несколько состояний pending,fulfilled, rejected
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (
                state,
                action: PayloadAction<Array<Comment>>,
            ) => {
                state.isLoading = false;
                // сам добавить id сам нормальзует данные и добавит entities
                commentsAdapter.setAll(state, action.payload); //  мы работаем с commentsAdapter и там происходит нормальзация,передаем наш стейт и данные которые мы хотим добавить в стейт
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { reducer: ArticleDetailsCommentsReducer } = articleDetailsCommentsSlice;
export const { actions: ArticleDetailsActions } = articleDetailsCommentsSlice;
