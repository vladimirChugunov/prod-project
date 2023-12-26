import { classNames } from 'shared/lib/classNames/classNames';
import { AppLick, AppLinkTheme } from 'shared/ui/AppLink/AppLick';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.links}>
                <AppLick theme={AppLinkTheme.SECONDARY} to="/" className={cls.mainLink}>
                    {t('Главная')}
                </AppLick>
                <AppLick theme={AppLinkTheme.RED} to="/about">
                    {t('О сайте')}
                </AppLick>
            </div>
        </div>
    );
};
