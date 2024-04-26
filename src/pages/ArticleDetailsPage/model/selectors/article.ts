import { createSelector } from '@reduxjs/toolkit';
import { getUserData } from 'entities/User';
import { articleDetailsData } from 'entities/Article';

export const getCanEditArticle = createSelector(
    articleDetailsData,
    getUserData,
    (article, user) => {
        if (!article || !user) {
            return false;
        }
        return article.user.id === user.id;
    },
);
