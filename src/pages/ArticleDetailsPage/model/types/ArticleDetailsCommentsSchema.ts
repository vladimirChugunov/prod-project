import { EntityState } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';

// EntityState<Comment> тип для передачи в ids и entities нашего типа с комментами
export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
  isLoading?: boolean;
  errors?: string;
}
