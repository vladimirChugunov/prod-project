import { CounterSchema } from 'entities/Counter';

// Тут объеденяем все типы из созданых слайсов, общий тип, плюс есть понятное описание
export interface StateSchema {
    counter: CounterSchema
}
