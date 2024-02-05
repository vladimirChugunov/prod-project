import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getArticleCommentsIsLoading } from '../../model/selectors/ comments';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducerList = {
    ArticleDetailsComments: ArticleDetailsCommentsReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    // нет необходимости писать все селекторы для entities (комментов), мы можем их получать из getArticleComments.selectAll, без logging и errors
    const comments = useSelector(getArticleComments.selectAll);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    if (!id) {
        return (
            <div
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                {t('articleNotFound')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <ArticleDetails id={id} />
                <Text className={cls.commentTitle} title={t('comment')} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage); //  лейзи лоудниг можно делать толкьо с дефолтными экспортами
