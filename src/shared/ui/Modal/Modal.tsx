import React, {
    MutableRefObject,
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames } from '../../lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode
    isOpen?: boolean;
    onClose?: () => void
    lazy?: boolean;
}

const ANIMATION_DELAY = 200;

export const Modal = ({
    className,
    children,
    isOpen,
    onClose,
    lazy, // добавляем модалку в дом дерево, только когда lazy === true , при ее открытии только (Ленивая загрузка), для добавления в модалку ассинхронных компонетов
}: ModalProps) => {
    const [isClosing, setIsClosing] = useState(false);
    // <ReturnType<typeof setTimeout> получаем тип который возвращает setTimout
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const [isMounted, setIsMounted] = useState(false); // вмонтирована модалка в дом дерево или нет

    // Как только откроем модалку добавляем в дом дерево модалку
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (onClose) {
            // помещаем в функцию ref для возможности очистки, если по какой-то причине у нас удалиться модальное окно из DOM дерева, то setTimout не отработает ,
            // так как не найдет в дом дереве элемента в отличии от setState, от попытается изменить стейт для несуществующего компонета и упадет с ошибкой все
            // закрываем модальное окно после выполнения таймаута
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                // setIsMounted(false); // подумай надо или нет, возможно при отправки формы проблемы если после закрытия убирать е из дом дерева
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

    const mods: Record<string, boolean | undefined> = {
        [cls.opened]: isOpen, //  применяем или не применяем стили по классам котрые лежат в Modal.module.scss
        [cls.isClosing]: isClosing,
    };
    // если передан проп lazy и модалка не открыта, то вместо модалки возвращаем null
    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div
                className={classNames(cls.Modal, mods, [className])}
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
