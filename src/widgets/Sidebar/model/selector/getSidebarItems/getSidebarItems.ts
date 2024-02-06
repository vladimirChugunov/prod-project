import { createSelector } from '@reduxjs/toolkit';
import { getUserData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import Profile from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/articlePage.svg';
import { SidebarItemType } from '../../types/sidebar';

// Делаем реселект вызываем функцию createSelector, получаем getUserData (проверяем зареган ли пользователь) и создаем массив сайдбара и вкладок в нем
export const getSideBarItems = createSelector(
    getUserData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'main',
            }, {
                path: RoutePath.about,
                Icon: AboutIcon,
                text: 'aboutUs',
                authOnly: true,
            }];
        if (userData) {
            sidebarItemsList.push(
                {
                    path: RoutePath.profile + userData.id,
                    Icon: Profile,
                    text: 'profilePage',
                    authOnly: true,
                },
                {
                    path: RoutePath.articles,
                    Icon: ArticleIcon,
                    text: 'articlePage',
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
