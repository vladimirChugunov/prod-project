import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

// (instance)экземпляр объекта axios

// const baseUrl = __IS_DEV__ ? 'http://localhost:8000' : 'https://production.ru';  // Как вариант так сделать

// создаем instance при помощи функции create (axios.create)
export const $api = axios.create({
    baseURL: __API__, // порт на котором крутится бекенд
});
// interceptor патерн перехватчик, который отрабатывает перед каким-то действием
$api.interceptors.request.use((config) => {
    // type guard если в конфиге есть заголовок
    if (config.headers) {
    // в данном случае перед запрос авторизации
        config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    }
    return config;
});
