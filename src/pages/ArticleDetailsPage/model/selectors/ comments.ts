import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StateSchema) => state.ArticleDetailsComments?.isLoading;

export const getArticleCommentsErrors = (state: StateSchema) => state.ArticleDetailsComments?.errors;
