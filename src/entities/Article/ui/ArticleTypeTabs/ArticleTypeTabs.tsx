import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleTypeTabs.module.scss';

interface ArticleTypeTabsProps {
    className?: string;
}

export const ArticleTypeTabs = ({ className }: ArticleTypeTabsProps) => {
    const { t } = useTranslation();

    return (
        <div
            className={classNames(cls.ArticleTypeTabs, {}, [className])}
        >
            {}
        </div>
    );
};
