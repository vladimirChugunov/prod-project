import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

// Компонет добавляет цвет соответствущий теме
interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>> // С заглавной буквы так как принимаем компонет
}

export const Icon = ({ className, Svg }: IconProps) => (
    <Svg className={classNames(cls.Icon, {}, [className])} />
);
