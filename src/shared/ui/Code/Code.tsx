import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import { Button, ButtonTheme } from '../Button/Button';
import Copy from '../../assets/icons/copy.svg';
import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string
}

// pre сохраняем пробелы, переносы все что есть внутри текста. code оборачиваем код для переносов строк и тд...
export const Code = ({ className, text }: CodeProps) => {
    const { t } = useTranslation();

    const onCopy = useCallback(() => {
        // Используем для выполенения разных сценариев, например копирование clipboard(буфер обмена)
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button onClick={onCopy} className={cls.copyBtn} theme={ButtonTheme.CLEAR}>
                <Copy className={cls.copyIcon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
};
