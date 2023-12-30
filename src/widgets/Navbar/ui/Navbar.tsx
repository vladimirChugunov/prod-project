import { classNames } from 'shared/lib/classNames/classNames';
import React, { useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUserName';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation('navbar');
    const [isAuthModal, setIsAuthModal] = useState(false);
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
