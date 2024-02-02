import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileLoading } from './getProfileLoading';

describe('getProfileLoading.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                isLoading: true,
            },
        };
        expect(getProfileLoading(state as StateSchema)).toEqual(true);
    });
    test('should return false', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: false,
            },
        };
        expect(getProfileLoading(state as StateSchema)).toEqual(false);
    });
});
