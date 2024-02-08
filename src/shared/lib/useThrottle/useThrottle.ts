// Тротлинг позволяет выполнить только одно событие в промежуток времени
// Спервый аргумент само событие которое должно выполняться и delay какая должна быть задержка
// Тормозящий декоратор(обвертка над вункцией которая модифицирует ее поведение враппер) в js
import { useCallback, useRef } from 'react';

//  Используем  args: any[] так-ка кнезнаем какого типа у нас могут быть аргументы
export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    // Можно ли сейчас вызывать коллбек или нельзя
    const throttleRef = useRef(false);
    // возвращаем колбек с тротлингом
    return useCallback(
        (...args: any[]) => {
            // вызываем колбек когда throttleRef.current = false
            if (!throttleRef.current) {
                callback(...args);
                throttleRef.current = true;

                setTimeout(() => {
                    // ждем когда отработает сейт таймаут с переданным значением и устанавливаем throttleRef.current = false; и можно вызывать колбек сверзу
                    throttleRef.current = false;
                }, delay);
            }
        },
        [callback, delay],
    );
}
