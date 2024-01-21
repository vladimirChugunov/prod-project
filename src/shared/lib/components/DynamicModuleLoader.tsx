import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';

export type ReducerList = {
    [name in StateSchemaKey]?: Reducer // ключ из StateSchemaKey, а значение Reducer
}

interface DynamicModuleLoaderProps {
    reducers: ReducerList
    removeAfterUnmount?: boolean
}

// Компонет для мотрирования размонтирования, ассинхронных редьюсерров
export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children,
        reducers,
        removeAfterUnmount,
    } = props;
    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager; // хук редаскса, для получения стора и его функций dispatch, getState итд...

    // Добавляем редьюсер в момент монтирования компонета
    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            // Указываем ключ для добавления и 2 аргументом сам редьюсер
            store.reducerManager.add(name as StateSchemaKey, reducer); // редьюсер будет подгружаться толькоо с самим компонетом
            dispatch({ type: `@INIT ${name} reducer` }); // Для логирования в  reactDevTools, монтирование
        });
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    // При демонтировании компонета удалем редьюсер
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` }); // // Для логирования в  reactDevTools, размонтирование
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {children}
        </>
    );
};
