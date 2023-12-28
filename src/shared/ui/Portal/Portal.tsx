import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode; // Элемент который мы передаем и телепортируем с помощью протала
    element?: HTMLElement // Контейнер куда мы телепортируем, например document.body
}

export const Portal = (props: PortalProps) => {
    const {
        children,
        element = document.body,
    } = props;
    return (
        createPortal(children, element)
    );
};
