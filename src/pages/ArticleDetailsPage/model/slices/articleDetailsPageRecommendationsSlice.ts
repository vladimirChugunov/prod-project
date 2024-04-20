// Нормальзация данных
// Функция, которая генерирует набор готовых редукторов и селекторов для выполнения операций CRUD над нормализованной структурой состояния ,
// содержащей экземпляры объекта данных определенного типа.
import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { ArticleDetailsPageRecommendationsSchema } from '../../model/types/articleDetailsPageRecommendationsSchema';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';

// сам добавить id сам нормальзует данные и добавит entities, он создает entities c массивом наших комментов [1,2,3] которые привязаны к id пользолвателя, а внутри лежит user
// тоесть для каждого id комментария у нас внутри лежит пользователь который создал (аватарка, имя) его и сам комментарий и в fetchCommentsByArticleId мы передали id статьи,
// он привяжется конкретно к этой статье!!!
const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id, // реализуем функцию получения id поля по которому пойдет нормальзация
});

// Создаем селектор по которому мы будем получать комментарии
export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    // возвращаем стейт state.ArticleDetailsRecommendation и initial state recommendationsAdapter.getInitialState()
    (state) => state.articleDetailsPage?.recommendations
      || recommendationsAdapter.getInitialState(),
);

const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'articleDetailsPageRecommendationsSlice',
    initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsPageRecommendationsSchema>(
        {
            isLoading: false,
            errors: undefined,
            ids: [],
            entities: {},
        },
    ), // передаем initial state адампторы в которым мы получаем id
    reducers: {},
    extraReducers: (builder) => {
    // работатем с нашей санкой из нее мы получаем несколько состояний pending,fulfilled, rejected
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.errors = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchArticleRecommendations.fulfilled,
                (state, action: PayloadAction<Array<Article>>) => {
                    state.isLoading = false;
                    // сам добавить id сам нормальзует данные и добавит entities
                    recommendationsAdapter.setAll(state, action.payload); //  мы работаем с recommendationsAdapter и там происходит нормальзация,передаем наш стейт и данные которые мы хотим добавить в стейт
                },
            )
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            });
    },
});

export const { reducer: articleDetailsPageRecommendationsReducer } = articleDetailsPageRecommendationsSlice;
export const { actions: articleDetailsPageRecommendationsActions } = articleDetailsPageRecommendationsSlice;
