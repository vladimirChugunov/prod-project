import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';

// специальные модули, которые созданы для того, чтобы считывать и обрабатывать файлы. Собираем разные расширения cjs, ejs, html, typescript и обрабатываем их
export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };
    // ВООБЩЕ НУЖНО УСТАНОВИТЬ, НО ВЫЗЫВЕТ ПРОБЛЕМЫ РАЗОБРАТЬСЯ!!
    // Транспилятор для js  из одних стандартов в другие , использую ts loader он не нужен, пример
    // const babelLoader = {
    //     test: /\.(js|jsx|tsx)$/,
    //     exclude: /node_modules/,
    //     use: {
    //         loader: 'babel-loader',
    //         options: {
    //             presets: ['@babel/preset-env'],
    //             plugins: [
    //                 [
    //                     'i18next-extract',
    //                     {
    //                         locales: ['ru', 'en'],
    //                         keyAsDefaultValue: true,
    //                     },
    //                 ],
    //             ],
    //         },
    //     },
    // };

    const cssLoader = buildCssLoader(isDev);

    // Если не используем тайпскрипт - нужен babel-loader выше
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    presets: ['@bfile/preset-env'],
                    plugins: [
                        [
                            'i18next-extract',
                            {
                                locales: ['ru', 'en'],
                                keyAsDefaultValue: true,
                            },
                            // Не работате нужно вынести в babelLoader
                            [isDev && require.resolve('react-refresh/babel')].filter(Boolean), // hot replacement обновляем без перезагрузки страницы
                        ],
                    ],
                },
            },
        ],
    };

    return [
        fileLoader,
        svgLoader,
        typescriptLoader,
        cssLoader,
    ];
}
