import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string }>();

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
        <div
            className={classNames(cls.ArticleDetailsPage, {}, [className])}
        >
            <ArticleDetails id={id} />
        </div>
    );
};

export default memo(ArticleDetailsPage); //  лейзи лоудниг можно делать толкьо с дефолтными экспортами
