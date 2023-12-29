import { StateSchema } from 'app/providers/StoreProvider'; // В редких случаях мы можем экспортировать типы из верхнего слоя

// Селектор для возврата всего стейта
export const getCounter = (state: StateSchema) => state.counter;
