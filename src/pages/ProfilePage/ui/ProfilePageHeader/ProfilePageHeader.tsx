import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import {
    getProfileData, getProfileReadonly, profileAction, updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { getUserData } from 'entities/User';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation('profile');
    const authData = useSelector(getUserData);
    const profile = useSelector(getProfileData);
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const canEdit = authData?.id === profile?.id;

    const onEdit = useCallback(() => {
        dispatch(profileAction.setReadonly(false));
    }, [dispatch]);

    const onCanselEdit = useCallback(() => {
        dispatch(profileAction.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(updateProfileData());
        }
    }, [dispatch]);

    return (
        <div
            className={classNames(cls.ProfilePageHeader, {}, [className])}
        >
            <Text title={t('profile')} />
            {canEdit && (
                <div className={cls.btnWrapper}>
                    {readonly ? (
                        <Button
                            className={cls.editBtn}
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEdit}
                        >
                            {t('edit')}
                        </Button>
                    ) : (
                        <>
                            <Button
                                className={cls.editBtn}
                                theme={ButtonTheme.OUTLINE}
                                onClick={onSave}
                            >
                                {t('save')}
                            </Button>
                            <Button
                                className={cls.saveBtn}
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onCanselEdit}
                            >
                                {t('cancel')}
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
