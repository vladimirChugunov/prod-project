import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../../model/type/country';

interface CountrySelectProps {
    className?: string;
    value?: Country,
    onChange?: (value: Country) => void
    readonly?: boolean
}

const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Ukraine, content: Country.Ukraine },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

export const CountrySelect = memo(({
    className, value, onChange, readonly,
}: CountrySelectProps) => {
    const { t } = useTranslation('country');

    const onChangeHandler = useCallback((value: string) => { // функция которую мы должны передать в селект принимает стрингвое значение
        onChange?.(value as Country); // это стринговое значение явно катуем к Country
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('country')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});
