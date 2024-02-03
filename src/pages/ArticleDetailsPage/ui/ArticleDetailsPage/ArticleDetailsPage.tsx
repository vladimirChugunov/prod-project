import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article');

    return (
        <div
            className={classNames(cls.ArticleDetailsPage, {}, [className])}
        >
            11111111111
        </div>
    );
};

export default memo(ArticleDetailsPage); //  лейзи лоудниг можно делать толкьо с дефолтными экспортами
