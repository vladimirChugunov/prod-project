// Экспортируем редьюсер, чтобы потом в корень добавить
import { counterReducer } from './model/slice/counterSlice';
import { Counter } from './ui/Counter';
import { CounterSchema } from './model/type/counterSchema';

export {
    counterReducer,
    Counter,
    CounterSchema,
};
