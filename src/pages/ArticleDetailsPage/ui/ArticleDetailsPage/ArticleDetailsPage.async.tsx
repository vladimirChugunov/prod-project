import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ ОБУЧЕНИЯ!
    setTimeout(() => resolve(import('./ArticleDetailsPage')), 400);
}));
//  лейзи лоудниг можно делать толкьо с дефолтными экспортами
