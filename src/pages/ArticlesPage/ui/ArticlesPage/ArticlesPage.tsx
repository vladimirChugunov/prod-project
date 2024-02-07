import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { ArticleView } from 'entities/Article';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            <ArticleList
                view={ArticleView.BIG}
                articles={[]}
                // isLoading Не забудь передать
            />
        </div>
    );
});

export default memo(ArticlesPage); //  лейзи лоудниг можно делать толкьо с дефолтными экспортами
