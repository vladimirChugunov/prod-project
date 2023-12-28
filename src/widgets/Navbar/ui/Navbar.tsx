import { classNames } from 'shared/lib/classNames/classNames';
import React, { useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation('navbar');
    const [isAuthModal, setIsAuthModal] = useState(false);
    // ссылки которые мы передаем пропсами сохраняем/ но есть ньюансы
    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev); // при нажатии меняем состояние/ если prev = true, то будет false и наоботрот
    }, []);

    return (

        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onToggleModal}
            >
                {t('login')}
            </Button>
            <Modal
                isOpen={isAuthModal}
                onClose={onToggleModal}
            >
                {/* eslint-disable-next-line */}
                {t('skgheowplmnsdapoiaslkdgaqoilkbcvjahfopkaweflqwenjlalknhfoiqwehoiASDJFGOIQHWEROIHQOI')}

            </Modal>
        </div>
    );
};
