import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import i18n from 'shared/config/i18n/i18n';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginUserName } from '../../model/selectors/getLoginUserName/getLoginUserName';
import {
    getLoginPassword,
} from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void
}

const initialReducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation('auth');
    const dispatch = useAppDispatch();
    const userName = useSelector(getLoginUserName);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginLoading);
    const error = useSelector(getLoginError);

    const onChangeUserName = useCallback((value: string) => {
        dispatch(loginActions.setUserName(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUserName({ userName, password })); // передаем userName, password из useSelector(getLoginState)
        if (result.meta.requestStatus) {
            onSuccess();
        }
    }, [dispatch, onSuccess, password, userName]);

    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterUnmount
        >
            <div
                className={classNames(cls.LoginForm, {}, [className])}
            >
                <Text title={t('authorizationForm')} />
                {error && <Text text={i18n.t('errorLogin')} theme={TextTheme.ERROR} />}
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
        </DynamicModuleLoader>
    );
});

export default LoginForm;
