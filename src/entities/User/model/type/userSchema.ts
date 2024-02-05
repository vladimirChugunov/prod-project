export interface User {
    id: string;
    userName: string,
    avatar?: string
}

export interface UserSchema {
    authData?: User;
    _inited: boolean // _ указывает на то, что флаг нельзя менять
}
