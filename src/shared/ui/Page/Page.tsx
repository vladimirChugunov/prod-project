import {
    memo,
    MutableRefObject,
    ReactNode,
    useRef,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfinityScroll } from 'shared/lib/hooks/useInfinityScroll/useInfinityScroll';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode
    onScrollEnd?: () => void
}

// Оборачиваем компонет в Page, для того что-бы скролл был конерктно в компонете // задаем стили для страницы
export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>; // когда достигаем конца страницы (viewPort) передаем триггер

    useInfinityScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });
    return (
        <section
            className={classNames(cls.Page, {}, [className])}
            ref={wrapperRef}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    );
});
