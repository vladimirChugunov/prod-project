import React, { InputHTMLAttributes, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface inputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void
}

// Обернул в memo, для исключения лишник перересовок
export const Input = memo((props: inputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // записываем в onChange из пропсов onChange input. Тоесть это разные onChange
        onChange?.(e.target.value); // ?. работает и с функциями если пропс не передан(undefined), то функция вызвана не будет, чейниг, аналогично опциональной цепочке в объектах
    };

    return (
        <div
            className={classNames(cls.input, {}, [className])}
        >
            <input
                type={type}
                value={value}
                onChange={onChangeHandler}
                {...otherProps}
            />
        </div>
    );
});
