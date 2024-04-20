module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
        'plugin:storybook/recommended',
        'plugin:react-hooks/recommended', // /* ставить обязательно отвечает за Этот плагин ESLint обеспечивает соблюдение правил хуков, например пропуск значений в массиве зависимостей или забыл в useCallback обернуть */
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks'],
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: ['data-testid', 'to', 'target'], // Добавляем атрибуты в которые передаем например стрингу, что-бы I18n не ругался, пример  target="_blank"
            },
        ],
        'max-len': ['error', { ignoreComments: true, code: 125 }],
        'arrow-body-style': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error', // Проверка правила хуков
        'react-hooks/exhaustive-deps': 'error', // Проверка зависемомтей
        'no-param-reassign': 'off', // Даем возможность метять аргументы функции для редакс
        'no-undef': 'off', // Запретить использование необъявленных переменных, если они не упомянуты в /*global */комментариях. /*global DeepPartial, a*/ везде коммент ставить нужно будет
        'react/no-array-index-key': 'off', // даем возможность передавать index in key / если элементы не удаляются и не изменяються можно добавлять индекс!
    },
    globals: {
    // Чторбы линтер не ругался добавляем глобальные переменные
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};
