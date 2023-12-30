import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';

// Тут объеденяем все типы из созданых слайсов, общий тип, плюс есть понятное описание
export interface StateSchema {
    counter: CounterSchema
    user: UserSchema
}
