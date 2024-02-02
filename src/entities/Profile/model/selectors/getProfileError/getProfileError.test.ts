import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileErrors } from 'entities/Profile';

describe('getProfileError.tets', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: '123',
            },
        };

        expect(getProfileErrors(state as StateSchema)).toEqual('123');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileErrors(state as StateSchema)).toEqual(undefined);
    });
});
