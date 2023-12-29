// createSelector нужен для переиспользования и комбинирования селекторов, но и мемоизирует их значения
import { createSelector } from '@reduxjs/toolkit';
import { CounterSchema } from 'entities/Counter';
import { getCounter } from '../getCounter/getCounter';

export const getCounterValue = createSelector(
    getCounter, // первым аргументом передаем уже существующий селектор getCounter
    // будет пересчитыватся только тогда когда изменитьтся items // можно рабоать с возвращаемыми значениями нескольких селекторов
    (counter: CounterSchema) => counter.value, // вторым аргументом мы передаем колбек, в который принемаем значение из getCounter, таким образом мы можем рабоать с возвращаемыми значениями селекторов
);
