import { StateSchema } from 'app/providers/StoreProvider';

export const articleDetailsData = (state: StateSchema) => state.articleDetails?.data;
export const articleDetailsIsLoading = (state: StateSchema) => state.articleDetails?.isLoading;
export const articleDetailsError = (state: StateSchema) => state.articleDetails?.error;
