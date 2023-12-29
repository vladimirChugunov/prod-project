// Экспортируем редьюсер, чтобы потом в корень добавить
import { counterReduces } from './model/slice/counterSlice';
import { Counter } from './ui/Counter';
import { CounterSchema } from './model/type/counterSchema';

export {
    counterReduces,
    Counter,
    CounterSchema,
};
