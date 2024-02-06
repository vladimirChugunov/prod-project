import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import EyeIcon from '../../../../shared/assets/icons/eye-20-20.svg';
import Calendar from '../../../../shared/assets/icons/calendar-20-20.svg';
import { articleDetailsData, articleDetailsError, articleDetailsIsLoading } from '../../model/selector/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import cls from './ArticleDetails.module.scss';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(articleDetailsIsLoading);

    const error = useSelector(articleDetailsError);
    const article = useSelector(articleDetailsData);
    // {article?.blocks.map(renderBlock)} передаем функцию в map renderBlock. Блок из массива article?.blocks будет попадать в коллбек renderBlock  и отрисовыватся выбранный по свичу блок
    // Передаем ключ так как ниже мы мапаем renderBlock
    const renderBlock = useCallback(
        (block: ArticleBlock) => {
            switch (block.type) {
            case ArticleBlockType.CODE:
                return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block} />;
            case ArticleBlockType.TEXT:
                return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />;
            case ArticleBlockType.IMAGE:
                return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block} />;
            default:
                return null;
            }
        },
        [],
    );

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <Text title={t('errorPage')} align={TextAlign.CENTER} />
        );
    } else {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar
                        size={200}
                        src={article?.img}
                        className={cls.avatar}
                    />
                </div>
                <Text
                    title={article?.title}
                    text={article?.subtitle}
                    align={TextAlign.LEFT}
                />
                <div className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={EyeIcon} />
                    <Text text={String(article?.views)} />
                </div>
                <div className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={Calendar} />
                    <Text text={article?.createdAt} />
                </div>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
