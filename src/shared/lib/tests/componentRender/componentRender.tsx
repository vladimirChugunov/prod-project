import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';

export interface ComponentRenderOptions {
    route?: string;

}

// Враппер для использования тестов с i18n и роутингом , передаем туда компонет для тестирования
export function componentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
    const { route = '/' } = options; // можно передавать значения по умолчанию в дуструктуризацию
    return render(
        // MemoryRouter хранит историю вашего «URL-адреса» в памяти (не читает и не записывает в адресную строку)
        <MemoryRouter initialEntries={[route]}>
            <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
        </MemoryRouter>,
    );
}
