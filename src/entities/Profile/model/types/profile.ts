import { Currency } from 'entities/Currency/model/type/currency';
import { Country } from 'entities/Country/model/type/country';

export enum ValidateProfileError { // ошибки которые выводим
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    // INCORRECT_AGE = 'INCORRECT_AGE',
    // INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
    INCORRECT_USER_NAME = 'INCORRECT_USER_NAME',
}

export interface Profile {
    id?: string;
    first?: string,
    lastname?: string,
    age?: number,
    currency?: Currency,
    country?: Country,
    city?: string,
    username?: string,
    avatar?: string
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile; // Храним то что наизменял сам пользователь
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validate?: ValidateProfileError[]; // добавляем в сейт ошибки
}
