import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

// (instance)экземпляр объекта axios

// const baseUrl = __IS_DEV__ ? 'http://localhost:8000' : 'https://production.ru';  // Как вариант так сделать

// создаем instance при помощи функции create (axios.create)
export const $api = axios.create({
    baseURL: __API__, // порт на котором крутится бекенд
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY),
    },
});
