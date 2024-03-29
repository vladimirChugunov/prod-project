import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUserName } from './getLoginUserName';

describe('getLoginUserName.tets', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                userName: 'admin',
            },
        };
        expect(getLoginUserName(state as StateSchema)).toEqual('admin');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUserName(state as StateSchema)).toEqual('');
    });
});
