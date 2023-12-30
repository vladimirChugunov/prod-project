import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation('auth');

    return (
        <div
            className={classNames(cls.LoginForm, {}, [className])}
        >
            <Input type="text" className={cls.input} />
            <Input type="text" className={cls.input} />
            <Button className={cls.loginBtn}>
                {t('login')}
            </Button>
        </div>
    );
};
