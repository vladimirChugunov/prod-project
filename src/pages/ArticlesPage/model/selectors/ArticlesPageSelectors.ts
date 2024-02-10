import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleSortField, ArticleType, ArticleView } from 'entities/Article';

export const articlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading || false;
export const articlesPageError = (state: StateSchema) => state.articlesPage?.error;
export const articlesPageView = (state: StateSchema) => state.articlesPage?.view || ArticleView.SMALL;
export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1;
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 9;
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?._inited;
export const getArticlesSort = (state: StateSchema) => state.articlesPage?.sort ?? ArticleSortField.CREATED;
export const getArticlesSortOrder = (state: StateSchema) => state.articlesPage?.order ?? 'asc';
export const getArticlesSearch = (state: StateSchema) => state.articlesPage?.search ?? '';
export const getArticleType = (state: StateSchema) => state.articlesPage?.type ?? ArticleType.ALL;
