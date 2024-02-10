import { EntityState } from '@reduxjs/toolkit';
import {
    Article,
    ArticleView,
    ArticleSortField,
    ArticleType,
} from 'entities/Article';
import { SortOrder } from 'shared/types';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    view: ArticleView;
    page: number;
    limit: number;
    hasMore: boolean;
    // filters
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: ArticleType
    _inited: boolean; // _ поле неизменяемое  тоесть меняеться всего лиш один раз в момент инициалтизвции
}
