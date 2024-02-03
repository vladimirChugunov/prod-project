import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from 'entities/User';

function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited); // проверка инициализирован ли пользователь

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);
    /* Suspense чтобы не падало приложение при подгрузки переводов, нужен для работы с ассинхронными компонетами в реакт */
    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {/* Отрисовываем роуты только когда мы точно знаем, что пользователь авторизорван, не будут ренерится комоненты по пути типа /about,так они отресовывабтся когда есть путь, сайд бар будет отрисовываться но компонеты page слоя нет(они по пути ресуються) */}
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
