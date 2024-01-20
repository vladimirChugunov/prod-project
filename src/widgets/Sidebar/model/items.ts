import React from 'react';
import Profile from 'shared/assets/icons/profile.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export interface SidebarItemType {
    path: string,
    text: string,
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        Icon: MainIcon,
        text: 'main',
    }, {
        path: RoutePath.about,
        Icon: AboutIcon,
        text: 'aboutUs',
    }, {
        path: RoutePath.profile,
        Icon: Profile,
        text: 'profilePage',
    },
];
