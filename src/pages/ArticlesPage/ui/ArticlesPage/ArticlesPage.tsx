import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { ArticleView } from 'entities/Article';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
    articlesPageError,
    articlesPageIsLoading,
    articlesPageView,
} from '../../model/selectors/ArticlesPageSelectors';
import { ArticlePageActions, ArticlePageReducer, getArticles } from '../../model/slices/articlePageSlice';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    // Используем наш стейт с нормальзованными данными, отдельно селектор писать не нужно, для состояния isLoading, view селекторы пишем отдельно
    // тут только нормальщованные данные статей по id
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(articlesPageIsLoading);
    const error = useSelector(articlesPageError);
    const view = useSelector(articlesPageView); // скорее его переносить
    const reducer: ReducerList = {
        articlesPage: ArticlePageReducer,
    };

    const onViewClick = useCallback((view: ArticleView) => {
        dispatch(ArticlePageActions.stateView(view));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchArticlesList());
        dispatch(ArticlePageActions.initSate());
    });

    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onViewClick} />
                <ArticleList
                    view={view}
                    articles={articles}
                    isLoading={isLoading}
                />
            </div>
        </DynamicModuleLoader>
    );
});

export default memo(ArticlesPage); //  лейзи лоудниг можно делать толкьо с дефолтными экспортами
