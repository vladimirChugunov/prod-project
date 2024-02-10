import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOption<T> {
    value: T
    content: string
}

// Дженерик который расширяет string T extends string своего рода type guard, он не позволит передать лишние значения
export interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: Array<SelectOption<T>>;
    value?: T;
    onChange?: (value: T) => void
    readonly?: boolean
}

// Что-бы дженерики работали с мемо нужно писать обвертку которая умеет подхватывать пропсы// РАЗОБРАТЬ!!!!
// Дженерик который расширяет string T extends string своего рода type guard, он не позволит передать лишние значения
export const Select = <T extends string>(props: SelectProps<T>) => {
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
        onChange?.(e.target.value as T);
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
};
