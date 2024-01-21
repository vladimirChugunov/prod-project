import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';

// Общий класс для ассинхронных тестов createAsyncThunk(ассинхронных запросов)

// Тип который предситавляет функцию который принимает агрумент arg: Arg) и возвращает AsyncThunkAction<Return, Arg, { rejectValue: RejectValue }
type ActionCreatorType<Return, Arg, RejectValue>
    = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectValue }>

jest.mock('axios'); // Мокаем axios первым аргументом передаем название модуля, который хотим замокать

const mockedAxios = jest.mocked(axios, true); // Глубокий mocked (для тс и того чтобы поля внутри axios мокались по типу .post могли обратиться)

// ActionCreatorType<Return, Arg, RejectValue> Что возвращает asyncThunk Return - что возвращает, Arg - аргумент, RejectValue - возврат в случае ошибки
// (createAsyncThunk<User : Return, LoginByUserNameProps : Arg, { rejectValue: string } : RejectValue>)
export class TestAsyncThunk<Return, Arg, RejectValue> {
    // Указываем типы b и поля класса задаем
    dispatch: jest.Mocked<any>;

    getState: () => StateSchema;

    actionCreator: ActionCreatorType<Return, Arg, RejectValue>;

    api: jest.MockedFunctionDeep<AxiosStatic>; // мокаем наш extra аргумент

    navigate: jest.Mocked<any>; // вызов навигации

    // Вннутрь constructor принимаем сам asyncThunk
    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectValue>) {
        // Кладем в поля значения
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn();

        this.api = mockedAxios;
        this.navigate = jest.fn();
    }

    // Функция для вызова ассинхроного экшена // на вход принимаем аргумент который принимает asyncThunk
    async callThunk(arg: Arg) {
        // createAsyncThunk, это криейтор который после вызова возвращает action
        // Вызываем нашу санку ассинхронную loginByUserName() и пердаем аргументы
        const action = this.actionCreator(arg);
        const result = await action(
            this.dispatch,
            this.getState,
            { api: this.api, navigate: this.navigate },
        );// ts ждет от нас три типа

        return result;
    }
}
