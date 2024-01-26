import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/input/Input';
import { Profile } from 'entities/Profile';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency } from 'entities/Currency/model/type/currency';
import { CurrencySelect } from 'entities/Currency';
import { Country } from 'entities/Country/model/type/country';
import { CountrySelect } from 'entities/Country';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile
    error?: string,
    isLoading?: boolean,
    readonly?: boolean,
    onChangeFirstName?: (value?: string) => void
    onChangeLastName?: (value?: string) => void
    onChangeCity?: (value?: string) => void
    onChangeAge?: (value?: string) => void
    onChangeUserName?: (value?: string) => void
    onChangeAvatar?: (value?: string) => void
    onChangeCurrency?: (currency: Currency) => void
    onChangeCountry?: (country: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading,
        readonly,
        onChangeFirstName,
        onChangeLastName,
        onChangeAge,
        onChangeCity,
        onChangeUserName,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;
    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <div
                className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}
            >
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div
                className={classNames(cls.ProfileCard, {}, [className, cls.error])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t('profileError')}
                    text={t('refreshPage')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <div
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            <div className={cls.data}>
                {data?.avatar && (
                    <div className={cls.avatarWrapper}>
                        <Avatar src={data?.avatar} />
                    </div>
                )}
                <Input
                    label={t('yourName')}
                    value={data?.first}
                    className={cls.input}
                    onChange={onChangeFirstName}
                    readonly={readonly}
                />
                <Input
                    label={t('yourLastName')}
                    value={data?.lastname}
                    className={cls.input}
                    onChange={onChangeLastName}
                    readonly={readonly}
                />
                <Input
                    label={t('age')}
                    value={data?.age}
                    className={cls.input}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    label={t('city')}
                    value={data?.city}
                    className={cls.input}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    label={t('username')}
                    value={data?.username}
                    className={cls.input}
                    onChange={onChangeUserName}
                    readonly={readonly}
                />
                <Input
                    label={t('avatar')}
                    value={data?.avatar}
                    className={cls.input}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    className={cls.input}
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};
