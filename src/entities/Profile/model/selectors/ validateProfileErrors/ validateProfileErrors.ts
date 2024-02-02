import { StateSchema } from 'app/providers/StoreProvider';

export const validateProfileErrors = (state: StateSchema) => state.profile?.validate;
