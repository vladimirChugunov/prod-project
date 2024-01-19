import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

// Общий класс для ассинхронных тестов createAsyncThunk(ассинхронных запросов)

// Тип который предситавляет функцию который принимает агрумент arg: Arg) и возвращает AsyncThunkAction<Return, Arg, { rejectValue: RejectValue }
type ActionCreatorType<Return, Arg, RejectValue>
    = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectValue }>

// ActionCreatorType<Return, Arg, RejectValue> Что возвращает asyncThunk Return - что возвращает, Arg - аргумент, RejectValue - возврат в случае ошибки
// (createAsyncThunk<User : Return, LoginByUserNameProps : Arg, { rejectValue: string } : RejectValue>)
export class TestAsyncThunk<Return, Arg, RejectValue> {
    // Указываем типы b и поля класса задаем
    dispatch: jest.Mocked<any>;

    getState: () => StateSchema;

    actionCreator: ActionCreatorType<Return, Arg, RejectValue>;

    // Вннутрь constructor принимаем сам asyncThunk
    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectValue>) {
        // Кладем в поля значения
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn();
    }

    // Функция для вызова ассинхроного экшена // на вход принимаем аргумент который принимает asyncThunk
    async callThunk(arg: Arg) {
        // createAsyncThunk, это криейтор который после вызова возвращает action
        // Вызываем нашу санку ассинхронную loginByUserName() и пердаем аргументы
        const action = this.actionCreator(arg);
        const result = await action(this.dispatch, this.getState, undefined);// ts ждет от нас три типа

        return result;
    }
}
