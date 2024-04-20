import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlignSize } from 'shared/ui/Text/Text';
import { HTMLAttributeAnchorTarget } from 'react';
import { ArticleListItemSkeleton } from '../../ui/ArticleListItems/ArticleListItemsSkeleton';
import { ArticleListItems } from '../ArticleListItems/ArticleListItems';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Array<Article>;
  isLoading?: boolean;
  view?: ArticleView; // как будем отображать статью, в большом или маленьком виде
  target?: HTMLAttributeAnchorTarget;
}

// Не завязываемся на стрейт компонета, статьи принимаем из вне. Этот список мы будем использовать,
// как список рекомендаций внутри статьи (используем в нескольких местах)
export const ArticleList = (props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target,
    } = props;
    const { t } = useTranslation('article');
    // Отрисовываем слелетон стольок раз сколько у нас статей для маленьких 9, больших три

    const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
        ));

    const renderArticle = (article: Article) => (
        <ArticleListItems
            key={article.id}
            article={article}
            view={view}
            className={cls.card}
            target={target}
        />
    );

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={TextAlignSize.L} title={t('notArticles')} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {articles.length > 0 ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons(view)}
        </div>
    );
};
