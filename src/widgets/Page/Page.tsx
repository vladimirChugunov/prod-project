import {
    memo, MutableRefObject, ReactNode, useRef, UIEvent,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfinityScroll } from 'shared/lib/hooks/useInfinityScroll/useInfinityScroll';
import { useDispatch, useSelector } from 'react-redux';
import { getSaveScrollByPath, saveScrollActions } from 'pages/SaveScroll';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

// Оборачиваем компонет в Page, для того что-бы скролл был конерктно в компонете // задаем стили для страницы
export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>; // когда достигаем конца страницы (viewPort) передаем триггер
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getSaveScrollByPath(state, pathname));

    useInfinityScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });
    // Сохраняем позицию скрола при размонтировнии компонета
    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });
    // передаем позицию в стейт
    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            saveScrollActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            }),
        );
    }, 500);

    return (
        <section
            className={classNames(cls.Page, {}, [className])}
            ref={wrapperRef}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
        </section>
    );
});
