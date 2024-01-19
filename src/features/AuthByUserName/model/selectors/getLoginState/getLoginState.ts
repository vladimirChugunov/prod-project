import { StateSchema } from 'app/providers/StoreProvider';
// Общий не используем, пример
export const getLoginState = (state: StateSchema) => state?.loginForm;
