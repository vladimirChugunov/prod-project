import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string
    content: string
}

export interface SelectProps {
    className?: string;
    label?: string;
    options?: Array<SelectOption>;
    value?: string;
    onChange?: (value: string) => void
    readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        label,
        options,
        value,
        readonly,
        onChange,
    } = props;

    const mods: Mods = {};

    const optionList = useMemo(() => (
        options?.map((opt) => (
            <option
                className={cls.option}
                value={opt.value}
                key={opt.value}
            >
                {opt.content}
            </option>
        ))
    ), [options]);
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div
            className={classNames(cls.Wrapper, mods, [className])}
        >
            {label && (
                <span className={cls.label}>{`${label}> `}</span>
            )}
            <select
                disabled={readonly}
                value={value}
                onChange={onChangeHandler}
                className={cls.select}
            >
                {optionList}
            </select>
        </div>
    );
});
