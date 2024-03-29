import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme
}

// Закругляем и задаем цвет фона
export const Card = memo((
    {
        className,
        children,
        theme = CardTheme.NORMAL,
        ...otherProps
    }: CardProps,
) => (
    <div
        className={classNames(cls.Card, {}, [className, cls[theme]])}
        {...otherProps}
    >
        {children}
    </div>
));
