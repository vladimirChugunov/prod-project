import axios from 'axios';
import { loginByUserName } from 'features/AuthByUserName/model/services/loginByUserName/loginByUserName';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

// Мокаем приходящие с сервера данные (они не с сервака приходят, это мок как-бы сервер)
jest.mock('axios'); // Мокаем axios первым аргументом передаем название модуля, который хотим замокать

const mockedAxios = jest.mocked(axios, true); // Глубокий mocked (для тс и того чтобы поля внутри axios мокались по типу .post могли обратиться)

describe('loginByUserName.test', () => {
    // Обьявляем типы
    // let dispatch: Dispatch; // типизируем функции для того что-бы замокать
    // let getState: () => StateSchema; // функция которая возвращает стейт
    //
    // // beforeEach функция вызывается перед каждым тестом, для каждого теста
    // beforeEach(() => {
    //     dispatch = jest.fn(); // Для dispatch присваиваем функцию jest замоканную
    //     getState = jest.fn(); // присваеваем функции тут
    // });
    // Тест асснихронный
    test('success login', async () => {
        const userValue = { userName: '123', id: '1' };
        // (Мокаем значение) jest добавлет для замоконных функций в нашем случае axios долбавляет функции оп типу mockReturnValue
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
        // Создаем обьект из класса который мы сделали
        const thunk = new TestAsyncThunk(loginByUserName);
        const result = await thunk.callThunk({ userName: '123', password: '123' });

        // Так-как диспатч в ассинхронном action вызывается три раза делаем проверку
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        // Проверка на то ,что dispatch вызвался и заполнил стейт тем что там вернулось
        expect(thunk.dispatch(userActions.setAuthData(userValue)));
        // Проверяем вызвался ли метод Post
        expect(mockedAxios.post).toHaveBeenCalled();
        // проверяем, что status === fulfilled
        expect(result.meta.requestStatus).toBe('fulfilled');
        // Проверяем, что возвращаются данные о пользователе payload это то что с сервака вернулось, а не передалось
        expect(result.payload).toEqual(userValue);
    });
    // обработаем вариант с ошибкой 403
    test('error login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: '403' }));
        const thunk = new TestAsyncThunk(loginByUserName);
        const result = await thunk.callThunk({ userName: '123', password: '123' });
        // Так-как диспатч в ассинхронном action вызывается три раза делаем проверку, но при rejected 2
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual('error');
    });
    // Без класса
    // test('success login', async () => {
    //     const userValue = { userName: '123', id: '1' };
    //     // (Мокаем значение) jest добавлет для замоконных функций в нашем случае axios долбавляет функции оп типу mockReturnValue
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
    //     // createAsyncThunk, это криейтор который после вызова возвращает action
    //     // Вызываем нашу санку ассинхронную loginByUserName() и пердаем аргументы
    //     const action = loginByUserName({ userName: '123', password: '123' });
    //     const result = await action(dispatch, getState, undefined);// ts ждет от нас три типа
    //     console.log(result); // смотрим что возвращается
    //     // Так-как диспатч в ассинхронном action вызывается три раза делаем проверку
    //     expect(dispatch).toHaveBeenCalledTimes(3);
    //     // Проверка на то ,что dispatch вызвался и заполнил стейт тем что там вернулось
    //     expect(dispatch(userActions.setAuthData(userValue)));
    //     // Проверяем вызвался ли метод Post
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     // проверяем, что status === fulfilled
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //     // Проверяем, что возвращаются данные о пользователе payload это то что с сервака вернулось, а не передалось
    //     expect(result.payload).toEqual(userValue);
    // });
    // // обработаем вариант с ошибкой 403
    // test('error login', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: '403' }));
    //     const action = loginByUserName({ userName: '123', password: '123' });
    //     const result = await action(dispatch, getState, undefined);// ts ждет от нас три типа
    //     // Так-как диспатч в ассинхронном action вызывается три раза делаем проверку, но при rejected 2
    //     expect(dispatch).toHaveBeenCalledTimes(2);
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toEqual('error');
    // });
});
