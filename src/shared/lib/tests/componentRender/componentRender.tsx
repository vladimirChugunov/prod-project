import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import i18nForTests from '../../../config/i18n/i18nForTests';

export interface ComponentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>
}

// Враппер для использования тестов с i18n и роутингом , передаем туда компонет для тестирования
export function componentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
    const {
        route = '/',
        initialState,
    } = options; // можно передавать значения по умолчанию в дуструктуризацию
    // MemoryRouter хранит историю вашего «URL-адреса» в памяти (не читает и не записывает в адресную строку), StoreProvider для компонентов в которых используется стейт редакс
    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState as StateSchema}>
                <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
}
