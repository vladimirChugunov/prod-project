import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { ArticleView } from 'entities/Article';
import { Page } from 'shared/ui/Page/Page';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {
    articlesPageIsLoading,
    articlesPageView,
} from '../../model/selectors/ArticlesPageSelectors';
import {
    ArticlePageActions,
    ArticlePageReducer,
    getArticles,
} from '../../model/slices/articlePageSlice';
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
    const view = useSelector(articlesPageView); // скорее его переносить
    const reducer: ReducerList = {
        articlesPage: ArticlePageReducer,
    };

    const onViewClick = useCallback(
        (view: ArticleView) => {
            dispatch(ArticlePageActions.stateView(view));
        },
        [dispatch],
    );

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage());
    });
    // removeAfterUnmount={false} в данный момент мы не хотим что-бы при переходе в карточку статьи и по ее возвращению у нас дестроился стейт и заново создавался
    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount={false}>
            <Page
                className={classNames(cls.ArticlesPage, {}, [className])}
                onScrollEnd={onLoadNextPart}
            >
                <ArticleViewSelector view={view} onViewClick={onViewClick} />
                <ArticleList view={view} articles={articles} isLoading={isLoading} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default memo(ArticlesPage); //  лейзи лоудниг можно делать толкьо с дефолтными экспортами
