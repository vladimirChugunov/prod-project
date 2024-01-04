import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;

}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation('auth');
    const dispatch = useDispatch();
    const {
        userName, password, error, isLoading,
    } = useSelector(getLoginState);

    const onChangeUserName = useCallback((value: string) => {
        dispatch(loginActions.setUserName(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUserName({ userName, password })); // передаем userName, password из useSelector(getLoginState)
    }, [dispatch, password, userName]);

    return (
        <div
            className={classNames(cls.LoginForm, {}, [className])}
        >
            <Text title={t('authorizationForm')} />
            {error && <Text text={error} theme={TextTheme.ERROR} />}
            <Input
                label={t('userName')}
                type="text"
                className={cls.input}
                autoFocus
                onChange={onChangeUserName}
                value={userName}
            />
            <Input
                label={t('password')}
                type="text"
                className={cls.input}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('login')}
            </Button>
        </div>
    );
};
