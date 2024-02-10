import { MutableRefObject, useCallback, useRef } from 'react';

// Позволяет отменять предыдущие событие в течени какогото времени, до тех пор когда мы что-то вводим в инпут у нас колбек вызыватсья не будет
// ка кпройдет время delay у нас будет вызван калбек с запросом, а все предыдущие вызовы будут отменены
export function useDebounce(callback: (...args: any[]) => void, delay: number) {
    // Можно ли сейчас вызывать коллбек или нельзя
    const timer = useRef() as MutableRefObject<any>;
    // возвращаем колбек с тротлингом
    return useCallback((...args: any[]) => {
        // пока таймер очищается callback(...args) вызванна не будет
        if (timer.current) {
            // Если у нас сохранен какой-то таймаут то мы его очищаем, каждый раз когда вызывается функция
            clearTimeout(timer.current);
        }
        // Создаем новый таймер
        timer.current = setTimeout(() => {
            callback(...args); // вызываем callback с задержкой delay
        }, delay);
    }, [callback, delay]);
}
