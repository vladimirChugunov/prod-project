import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginLoading } from './getLoginLoading';

describe('getLoginLoading.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                isLoading: true,
            },
        };
        expect(getLoginLoading(state as StateSchema)).toEqual(true);
    });
    test('should return false', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                isLoading: false,
            },
        };
        expect(getLoginLoading(state as StateSchema)).toEqual(false);
    });
});
