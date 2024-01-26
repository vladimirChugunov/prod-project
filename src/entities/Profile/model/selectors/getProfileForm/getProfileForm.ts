import { StateSchema } from 'app/providers/StoreProvider';

// Дублирует data, нужно для того чтобы при отмене изменений мы не делали запрос на сервер
export const getProfileForm = (state: StateSchema) => state.profile?.form;
