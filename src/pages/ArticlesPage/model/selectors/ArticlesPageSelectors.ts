import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const articlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading || false;

export const articlesPageError = (state: StateSchema) => state.articlesPage?.error;

export const articlesPageView = (state: StateSchema) => state.articlesPage?.view || ArticleView.SMALL;

export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1;

export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 9;

export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
