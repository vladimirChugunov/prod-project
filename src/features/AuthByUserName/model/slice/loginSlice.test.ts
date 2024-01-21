import { loginByUserName } from '../services/loginByUserName/loginByUserName';
import { loginActions, loginReducer } from '../slice/loginSlice';
import { LoginSchema } from '../type/loginSchema';

describe('loginSlice.test', () => {
    test('test set userName', () => {
        const state: DeepPartial<LoginSchema> = { userName: '123' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setUserName('1234'),
        )).toEqual({ userName: '1234' });
    });
    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = { password: '123' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setPassword('1234'),
        )).toEqual({ password: '1234' });
    });
    // писать не обязательно, так все в asyncCreator тетах тестируем ошибки и ассинхронные операции
    test('test set isLoading', () => {
        const state: DeepPartial<LoginSchema> = { isLoading: true };
        expect(loginReducer(
            state as LoginSchema,
            // Тестируем асснихронные данные из extraReducers
            // у экшена получаем rejected, это значит, что isLoading: false
            loginByUserName.rejected,
        )).toEqual({ isLoading: false });
    });
});
