import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';

// Тут объеденяем все типы из созданых слайсов, общий тип, плюс есть понятное описание
export interface StateSchema {
    counter: CounterSchema
    user: UserSchema
    loginForm?: LoginSchema // опциональный для ассинхроной подгрузки
}
