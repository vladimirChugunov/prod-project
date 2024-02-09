import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import { ArticleSortField } from 'entities/Article/model/types/article';
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

  _inited: boolean; // _ поле неизменяемое  тоесть меняеться всего лиш один раз в момент инициалтизвции
}
