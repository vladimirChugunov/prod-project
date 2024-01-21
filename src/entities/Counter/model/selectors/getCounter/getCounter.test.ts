import { StateSchema } from 'app/providers/StoreProvider';
import { getCounter } from '../../../model/selectors/getCounter/getCounter';

describe('getCounter', () => {
    // проверяем, что селектор возвращает тот учаток стейта который мы ожидаем
    test('should return counter value', () => {
        // задаем стейт, с которым будем сравнивать .toEqual({ value: 10 })
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        }; // DeepPartial позволяет проигнорировать все поля и выбрать те которые необходимы
        // Мы проверяем, что getCounter вернет участок стейта, который отвечает за счетчик, тоесть передаем сформированный выше стейт value: 10 в getCounter
        expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
    });
});
