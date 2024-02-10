import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { useCallback, useMemo } from 'react';
import { ArticleSortField, ArticleSortSelector, ArticleView } from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/input/Input';
import { SortOrder } from 'shared/types';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article/model/types/article';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
    articlesPageView,
    getArticlesPageNum,
    getArticlesSearch,
    getArticlesSort,
    getArticlesSortOrder,
    getArticleType,
} from '../../model/selectors/ArticlesPageSelectors';
import { ArticlePageActions } from '../../model/slices/articlePageSlice';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = ({
    className,
}: ArticlesPageFiltersProps) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const view = useSelector(articlesPageView);
    const sort = useSelector(getArticlesSort);
    const order = useSelector(getArticlesSortOrder);
    const search = useSelector(getArticlesSearch);
    const page = useSelector(getArticlesPageNum);
    const type = useSelector(getArticleType);

    const onViewClick = useCallback(
        (view: ArticleView) => {
            dispatch(ArticlePageActions.setView(view));
        },
        [dispatch],
    );

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ page, replace: true })); // сбрасываем стейт для поиска по всем страницам
    }, [dispatch, page]);

    const debounceFetchData = useDebounce(fetchData, 500);

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(ArticlePageActions.setOrder(newOrder));
            // Сбрасываем страницу на 1, иначе мы долистаем до 10 странице и поиск будет происходить только на 10 странице
            dispatch(ArticlePageActions.statePage(1));
            fetchData(); // можно вызвать в useEffect передать туда массив зависемостей sort, order, search,
            // но это будет сайд эффект вызываем метод там где он действительно нужем, в нашем случае пришлось бы пердать в useEffect и debounceFetchData
            // и в нашем случае она бы запрашивалась даже когда мы не вводим в поле поиска ничего
        },
        [dispatch, fetchData],
    );

    const onChangeSort = useCallback(
        (newSort: ArticleSortField) => {
            dispatch(ArticlePageActions.setSort(newSort));
            // Сбрасываем страницу на 1, иначе мы долистаем до 10 странице и поиск будет происходить только на 10 странице
            dispatch(ArticlePageActions.statePage(1));
            fetchData(); // можно вызвать в useEffect передать туда массив зависемостей sort, order, search,
            // но это будет сайд эффект вызываем метод там где он действительно нужем
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(ArticlePageActions.setSearch(search));
            // Сбрасываем страницу на 1, иначе мы долистаем до 10 странице и поиск будет происходить только на 10 странице
            dispatch(ArticlePageActions.statePage(1));
            debounceFetchData(); // можно вызвать в useEffect передать туда массив зависемостей sort, order, search,
            // но это будет сайд эффект вызываем метод там где он действительно нужем
        },
        [debounceFetchData, dispatch],
    );

    const onChangeType = useCallback(
        (tab: TabItem) => {
            dispatch(ArticlePageActions.setType(tab.value as ArticleType));
            fetchData(); // можно вызвать в useEffect передать туда массив зависемостей sort, order, search,
        },
        [dispatch, fetchData],
    );

    // Создаем статичный массив tab с useMemo меняем только когда изменяем tab // если большой массив обьектов можно циклом пробежать
    const typeTabs = useMemo<Array<TabItem>>(() => [
        {
            value: ArticleType.ALL,
            content: t('all'),
        },
        {
            value: ArticleType.IT,
            content: t('it'),
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('economics'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('science'),
        },
    ], [t]);

    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onViewClick} />
            </div>
            <Card className={cls.search}>
                <Input
                    placeholder={t('search')}
                    value={search}
                    onChange={onChangeSearch}
                />
            </Card>
            <Tabs
                tabs={typeTabs}
                value={type}
                onTabClick={onChangeType}
                className={cls.tabs}
            />
        </div>
    );
};
