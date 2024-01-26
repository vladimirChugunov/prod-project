import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from '../../model/type/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency,
    onChange?: (value: Currency) => void
    readonly?: boolean
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(({
    className, value, onChange, readonly,
}: CurrencySelectProps) => {
    const { t } = useTranslation('currency');

    const onChangeHandler = useCallback((value: string) => { // функция которую мы должны передать в селект принимает стрингвое значение
        onChange?.(value as Currency); // это стринговое значение явно катуем к Currency
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('currency')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});
