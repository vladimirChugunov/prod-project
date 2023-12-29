import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
    test('with only first param', () => {
        componentRender(<Counter />, {
            initialSate: { counter: { value: 10 } },
        });
        expect(screen.getByTestId('value-title')).toHaveTextContent('10'); // проверяем, что value-title === 10
    });
    test('increment', () => {
        componentRender(<Counter />, {
            initialSate: { counter: { value: 10 } },
        });
        // Отслеживаем событие клика и ишем кнопку по id
        userEvent.click(screen.getByTestId('increment-btn'));
        expect(
            screen.getByTestId('value-title'), // ожидаем, что в выводе счетчика в h1 поменяется текст при increment
        ).toHaveTextContent('9');
    });
    test('decrement', () => {
        componentRender(<Counter />, {
            initialSate: { counter: { value: 10 } },
        });
        userEvent.click(screen.getByTestId('decrement-btn'));
        expect(
            screen.getByTestId('value-title'),
        ).toHaveTextContent('11');
    });
    // // Проверка при пустом стейте
    // test('should work with empty state', () => {
    //     expect(
    //         counterReduces(undefined, counterActions.increment()), // у нас установлен initialState = 0, поэтому мы должны получить 1 при increment
    //     ).toEqual({ value: 1 });
    // });
});
