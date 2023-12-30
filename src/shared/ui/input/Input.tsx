import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface inputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void
    label?: string;
    autoFocus?: boolean
}

// Обернул в memo, для исключения лишник перересовок
export const Input = memo((props: inputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        label,
        autoFocus, // подставляем автофокус для поля, корректка сразу отображается в input
        ...otherProps
    } = props;
    const ref = useRef<HTMLInputElement>(null); // указываем в dom дереве фокус напрямую, через реат не сделать
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    useEffect(() => {
        if (autoFocus) {
            setIsFocused(true); // при первом рендере устанавливаем каретку на input
            ref.current?.focus(); // устанавливаем фокус в дом дерево
        }
    }, [autoFocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // записываем в onChange из пропсов onChange input. Тоесть это разные onChange
        onChange?.(e.target.value); // ?. работает и с функциями если пропс не передан(undefined), то функция вызвана не будет, чейниг, аналогично опциональной цепочке в объектах
        setCaretPosition(e.target.value.length); // меняем позицию каретки она === позиции сроки которую мы ввели
    };
    // при выходе из инпут
    const onBlur = () => {
        setIsFocused(false);
    };
    // Принажатии на инпут
    const onFocus = () => {
        setIsFocused(true);
    };

    // Внутри onSelect мы можем смотреть, какая часть текста выделенна, гду у нас находится корретка
    const onSelect = (e: any) => {
        // получаем позицию корреки inputHtml и записываем ее в позицию нашей корретки
        setCaretPosition(e?.target?.selectionStart || 0); // selectionRange, c помощью них мы можем определфть какой текст выбран
    };

    return (
        <div
            className={classNames(cls.InputWrapper, {}, [className])}
        >
            {label && (
                <div className={cls.label}>
                    {`${label} >`}
                </div>
            )}
            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    // Внутри onSelect мы можем смотреть, какая часть текста выделенна, гду у нас находится корретка
                    onSelect={onSelect}
                    {...otherProps}
                />
                {isFocused && (
                    <span
                        className={cls.caret}
                        style={{ left: `${caretPosition * 9}px` }} // сдвиг влево на caretPosition, это позиция корретки относительно текста, а 9px это ширина шрифта(одной буквы)
                    />
                )}
            </div>
        </div>
    );
});
