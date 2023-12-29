import React, {
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode
    isOpen?: boolean;
    onClose?: () => void

}

const ANIMATION_DELAY = 200;

export const Modal = ({
    className,
    children,
    isOpen,
    onClose,
}: ModalProps) => {
    const [isClosing, setIsClosing] = useState(false);
    // <ReturnType<typeof setTimeout> получаем тип который возвращает setTimout
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const { theme } = useTheme();

    const closeHandler = useCallback(() => {
        if (onClose) {
            // помещаем в функцию ref для возможности очистки, если по какой-то причине у нас удалиться модальное окно из DOM дерева, то setTimout не отработает ,
            // так как не найдет в дом дереве элемента в отличии от setState, от попытается изменить стейт для несуществующего компонета и упадет с ошибкой все
            // закрываем модальное окно после выполнения таймаута
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    // При перерендере компонета функции создаются заново создаются новые ссылки на функции (пример ссылки onKeyDown в массиве useEffect ниже),
    // добавляем useCallBack для мемеизации этих функций, запоминаем ссылку на эту функцию и выдаем ее если в массиве зависемостей ничего не изменилорсь
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        // Закрываем модалку по нажатию ESC
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    // Все таймауты , ассинхронные операции, по xорошему нужно очищать в useEffect после их выполнения
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown); // Позволяет добавлять множество обработчиков для одного события
        }
        // функция сработатет после демонтирования компонета и вызовет очистки
        return () => {
            // сбрасываем таймаут
            clearTimeout(timerRef.current);
            // Сбрасываем вызванный слушатель событий
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]); // onKeyDown ссылка на функцию

    // Останавливаем всплытие, что-бы клик по cls.content, контенту модалки не сбрасывал состояние isOpen
    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen, //  применяем или не применяем стили по классам котрые лежат в Modal.module.scss
        [cls.isClosing]: isClosing,
    };

    return (
        <Portal>
            <div
                className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}
            >
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
