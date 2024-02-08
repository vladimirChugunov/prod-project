import { StateSchema } from 'app/providers/StoreProvider';

export const addCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? ''; // Лучше ставить налиш опператор ?? так как если мы введем 0 в инпут
// а ноль для js это false  то примениться путая строка  если указать || а с  ?? пустрая строка будет null или undefined,  на 0  и другие false  значения он реагировать не будет
export const addCommentFormError = (state: StateSchema) => state.addCommentForm?.error;
