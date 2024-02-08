import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SaveScrollSchema } from '../../model/types/SaveScrollSchema';

const initialState: SaveScrollSchema = {
    scroll: {},
};

const saveScroll = createSlice({
    name: 'SaveScroll',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            // по ключу забираем путь на какой странице,  action.payload позиция скрола
            state.scroll[payload.path] = payload.position;
        },
    },
});

export const { reducer: saveScrollReducer } = saveScroll;
export const { actions: saveScrollActions } = saveScroll;
