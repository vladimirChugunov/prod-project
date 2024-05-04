import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    AppRoutersProps,
    routeConfig,
} from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { RequireAuth } from 'app/providers/router/ui/RequireAuth';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutersProps) => {
    // вункция высшего порядка, принимает функцию и возвращает функцию
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
                } // если на роутинг навешен authOnly (пользователь н езарегестирован) то RequireAuth редиректнет на main
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
            {' '}
            {/* Object.values(routeConfig) ===  path: '/', element: {component} */}
        </Routes>
    );
};

export default memo(AppRouter);
