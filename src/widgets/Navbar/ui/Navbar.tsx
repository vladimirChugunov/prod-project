import { classNames } from 'shared/lib/classNames/classNames';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUserName';
import { getUserData, userActions } from 'entities/User';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation('navbar');
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserData);
    const dispatch = useDispatch();

    // ссылки которые мы передаем пропсами сохраняем/ но есть ньюансы
    // закрывается модалка в Modal, там описан сброс
    const onCloseModal = useCallback(() => {
        //  setIsAuthModal((prev) => !prev); // при нажатии меняем состояние/ если prev = true, то будет false и наоботрот
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        //  setIsAuthModal((prev) => !prev); // при нажатии меняем состояние/ если prev = true, то будет false и наоботрот
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    className={cls.links}
                    onClick={onLogout}
                >
                    {t('exit')}
                </Button>
            </div>
        );
    }

    return (

        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('login')}
            </Button>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </div>
    );
};
