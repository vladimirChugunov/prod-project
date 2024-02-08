import { MutableRefObject, useEffect } from 'react';

export interface UseInfinityScrollOption {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>; // пересекли этот реф и в это время вызываем api// // когда достигаем конца страницы (viewPort) передаем триггер
  wrapperRef: MutableRefObject<HTMLElement>; // враппер в котором находится скролл  // вешаем на div внутри которого мы будем отслеживать скролл
}

// Интерсекшон api / Позволяет нам наблюдать за появлением каких-то элементов/ позволяет реализовывать, лейзи лоуйдинг, бесконечный скролл и подобные вещи
export function useInfinityScroll({
    callback,
    triggerRef,
    wrapperRef,
}: UseInfinityScrollOption) {
    useEffect(() => {
        let observer: IntersectionObserver | null;
        const wrapperElement = wrapperRef.current; //  нужно для звмыкания внутри калбека который мы передаем в use effect,
        const triggerElement = triggerRef.current; //  нужно для звмыкания внутри калбека который мы передаем в use effect
        if (callback) {
            const options = {
                // передаем в observer / IntersectionObserver
                root: wrapperElement, // в этом параметре нужно указать элемент в котором находитсья скролл. Замкнутые дом ноды будут доступны нам в useEffeect и в случае когда компонет демонтироваля
                rootMargin: '0px',
                threshold: 1.0,
            };
            // Колл бек IntersectionObserver будет вызыватсья, когда на экране появиться элемент за которым мы следим
            // entries массив элементов за котороми мы наблюдаем
            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    // для того чтобы колбек отрабатывал один раз на последнем элементе
                    callback(); // передаем из вне
                }
            }, options);
            // вызывааем функцию обсервера и указываем элемент за которым мы будем следить
            observer.observe(triggerElement);
            // Итого: Сделали объект наблюдатель и сказали ему за чем мы будем наблюдать и передали колбек который будет вызываться при наблюдении
        }
        // ВАЖНО!!!
        // Воизбежании утечек памяти сбрасываем observer
        return () => {
            if (observer && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerElement); // вызваем unobserve и передаем туда triggerRef.current и сбрасываем
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
