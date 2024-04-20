import { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';
import { ArticleDetailsPageRecommendationsSchema } from './articleDetailsPageRecommendationsSchema';

// Объеденяем типы, для того что-бы использовать их в stateSchema, в объеденном типе ArticleDetailsPageSchema
export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema;
  recommendations: ArticleDetailsPageRecommendationsSchema;
}
