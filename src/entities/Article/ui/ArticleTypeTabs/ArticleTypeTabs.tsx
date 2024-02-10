import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { useCallback, useMemo } from 'react';
import { ArticleType } from 'entities/Article';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void
}

export const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation('article');

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
    // RКастуем так нельзя добавить дженерик в Tabs
    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as ArticleType);
        },
        [onChangeType],
    );

    return (
        <Tabs
            className={classNames('', {}, [className])}
            tabs={typeTabs}
            value={value}
            onTabClick={onTabClick}
        />
    );
};
