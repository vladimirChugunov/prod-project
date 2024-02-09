import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

// Закругляем и задаем цвет фона
export const Card = ({ className, children, ...otherProps }: CardProps) => (
    <div className={classNames(cls.Card, {}, [className])} {...otherProps}>
        {children}
    </div>
);
