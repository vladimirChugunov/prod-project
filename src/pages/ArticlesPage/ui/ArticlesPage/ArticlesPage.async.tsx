import { lazy } from 'react';

export const ArticlesPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ ОБУЧЕНИЯ!
    setTimeout(() => resolve(import('./ArticlesPage')), 400);
}));
//  лейзи лоудниг можно делать толкьо с дефолтными экспортами
