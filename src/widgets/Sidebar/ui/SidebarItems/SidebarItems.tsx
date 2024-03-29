import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { classNames } from 'shared/lib/classNames/classNames';
import { getUserData } from 'entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItems.module.scss';

interface SidebarItemsProps {
    item: SidebarItemType;
    collapsed: boolean
}

export const SidebarItems = memo(({ item, collapsed }: SidebarItemsProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>
                {t(item.text)}
            </span>
        </AppLink>
    );
});
