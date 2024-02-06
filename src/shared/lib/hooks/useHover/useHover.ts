// Есть события,  onMouseLeave, onMouseEnter, onMouseMove - Это события, которые отвечают за положение мыши, относительно какого-то элемента.
import { useCallback, useMemo, useState } from 'react';

interface UseHoverBind {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

type UseHoverResult = [boolean, UseHoverBind]
// Нужен для того чтобы отследить hover состояние через js. При наведении на элемент получаем стотояние hover true else false <div {...bindHover}/>
export const useHover = (): UseHoverResult => {
    // Принимаем значение false || true в заыисимсти от того навели ли мы на элемент или нет
    const [isHover, setIsHover] = useState(false);

    const onMouseEnter = useCallback(() => {
        setIsHover(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setIsHover(false);
    }, []);
    // Мы должны вернуть состояние isHover и и функции для его изменения
    return useMemo(() => [ // Возвращаем кортеж
        isHover,
        { //  выносим в обьект что-бы потом не тащить в кртеже при вызове 2 функции, а деструттуризировать и вытащить так const [isHover, bindHover] = useHover(); в bindHover ,будут лежать сразу 2 функции
            onMouseEnter,
            onMouseLeave,
        },

    ], [isHover, onMouseEnter, onMouseLeave]);
};
