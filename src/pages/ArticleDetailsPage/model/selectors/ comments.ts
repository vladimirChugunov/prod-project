import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StateSchema) => {
    return state.articleDetailsPage?.comments?.isLoading;
};

export const getArticleCommentsErrors = (state: StateSchema) => {
    return state.articleDetailsPage?.comments?.errors;
};
