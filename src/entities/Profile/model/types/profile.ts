import { Currency } from 'entities/Currency/model/type/currency';
import { Country } from 'entities/Country/model/type/country';

export interface Profile {
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
}
