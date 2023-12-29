import { Button } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
    const dispatch = useDispatch();
    const counterValue = useSelector(getCounterValue); // передаем функцию getCounterValue, которая возвращает значения счетчика
    const increment = () => {
        dispatch(counterActions.increment()); // Вызывает функцию increment в counterSlice и там выполняет state.value += 1
    };

    const decrement = () => {
        dispatch(counterActions.decrement()); // // Вызывает функцию decrement в counterSlice и там выполняет state.value -= 1
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button
                onClick={increment}
                data-testid="increment-btn"
            >
                increment
            </Button>
            <Button
                onClick={decrement}
                data-testid="decrement-btn"
            >
                decrement
            </Button>
        </div>
    );
};
