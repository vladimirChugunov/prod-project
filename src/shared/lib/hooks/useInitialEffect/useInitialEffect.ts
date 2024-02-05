import { useEffect } from 'react';

// Хук для того что-бы мы не принимали лишнее запросы в стори бук
export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            callback();
        }
        // должен отрабатывать один раз при мотрировании компонета
        // eslint-disable-next-line
    }, []);
}
