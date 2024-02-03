import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

// Приватный роутинг,
export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = useSelector(getUserData); // проверяем авторизаван ли пользователь
    const location = useLocation(); // Этот хук возвращает текущий location объект,Путь текущего URL-адреса,Строка запроса текущего URL-адреса и тд...

    if (!auth) {
        // Перенаправляем на страницу main(в нашем случае, лучше на логинг), но сохраняем текущее местоположение, где они находились
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />; // меняет текущее местоположение при визуализации
    }

    return children;
}
