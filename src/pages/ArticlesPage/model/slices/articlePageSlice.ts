import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ARTICLE_VIEW_LOCALSTORAGE } from 'shared/const/localStorage';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/articlesPageSchema';

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id, // реализуем функцию получения id поля по которому пойдет нормальзация
});

// Создаем селектор по которому мы будем получать комментарии и уже его вызываем в компонете
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    // возвращаем стейт state.ArticleDetailsComments и initial state articlesAdapter.getInitialState()
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const ArticlePageSlice = createSlice({
    name: 'ArticlePageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.SMALL,
    }), // передаем initial state адампторы в которым мы получаем id
    reducers: {
        stateView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE, action.payload);
        },
        initSate: (state) => {
            state.view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE) as ArticleView;
        },
    },
    extraReducers: (builder) => {
        // работатем с нашей санкой из нее мы получаем несколько состояний pending,fulfilled, rejected
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesList.fulfilled, (
                state,
                action: PayloadAction<Array<Article>>,
            ) => {
                state.isLoading = false;
                // сам добавить id сам нормальзует данные и добавит entities
                articlesAdapter.setAll(state, action.payload); //  мы работаем с articlesAdapter и там происходит нормальзация,передаем наш стейт и данные которые мы хотим добавить в стейт
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: ArticlePageReducer } = ArticlePageSlice;
export const { actions: ArticlePageActions } = ArticlePageSlice;
