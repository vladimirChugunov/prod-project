import { CounterSchema } from '../type/counterSchema';
import { counterReduces, counterActions } from './counterSlice';

describe('counterSlice.test', () => {
    // Тестируем редьюсер, инкремент должен понизить значение стетчика стейт в state
    test('decrement', () => {
        const state: CounterSchema = { value: 10 }; // Используем CounterSchema, а не общий тип, так-как тестирую конктетный редьюсер
        expect(
            counterReduces(state, counterActions.decrement()),
        ).toEqual({ value: 9 });
    });
    test('increment', () => {
        const state = { value: 10 };
        expect(
            counterReduces(state, counterActions.increment()),
        ).toEqual({ value: 11 });
    });
    // Проверка при пустом стейте
    test('should work with empty state', () => {
        expect(
            counterReduces(undefined, counterActions.increment()), // у нас установлен initialState = 0, поэтому мы должны получить 1 при increment
        ).toEqual({ value: 1 });
    });
});
