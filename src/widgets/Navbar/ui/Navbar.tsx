import { classNames } from 'shared/lib/classNames/classNames';
import { AppLick, AppLinkTheme } from 'shared/ui/AppLink/AppLick';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => (
    <div className={classNames(cls.Navbar, {}, [className])}>
        <div className={cls.links}>
            <AppLick theme={AppLinkTheme.SECONDARY} to="/" className={cls.mainLink}>
                Главная
            </AppLick>
            <AppLick theme={AppLinkTheme.RED} to="/about">
                О сайте
            </AppLick>
        </div>
    </div>
);
