import { memo, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '../../lib/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: Array<TabItem>
    value: string,
    onTabClick: (tab: TabItem) => void
}

export const Tabs = memo(({
    className,
    tabs,
    value,
    onTabClick,
}: TabsProps) => {
    const { t } = useTranslation();
    // Применяем механизм замыкания, так-как нам нужно принять tab внутрь, а не event
    const clickHandler = useCallback((tab: TabItem) => () => {
        onTabClick(tab);
    }, [onTabClick]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    className={cls.tab}
                    key={tab.value}
                    onClick={clickHandler(tab)} // clickHandler должен принимать таб
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
