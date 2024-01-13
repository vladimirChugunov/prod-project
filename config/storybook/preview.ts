import type { Preview } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../src/app/providers/ThemeProvider';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { TranslationDecorator } from '../../src/shared/config/storybook/TranslationDecorator/TranslationDecorator';
// Задаем глобально для всего сторибук
export const preview: Preview = {
    // decorators: [StyleDecorator],
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

// это способ обернуть историю дополнительными функциями «рендеринга. Например для того чтобы стили глобальные подтянуть в каждую историю или тему
export default {
    decorators: [StyleDecorator, RouterDecorator, ThemeDecorator(Theme.LIGHT), TranslationDecorator],
};
