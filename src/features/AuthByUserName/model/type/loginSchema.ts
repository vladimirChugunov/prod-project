export interface LoginSchema {
    userName: string;
    password: string;
    isLoading: boolean; // для ассинхронного запроса котрый летит на сервер
    error?: string;
}
