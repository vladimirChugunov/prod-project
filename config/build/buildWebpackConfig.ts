import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

// Делаем декопозицию
export function buildWebpackConfig(
    options: BuildOptions,
): webpack.Configuration {
    const { paths, mode, isDev } = options;

    return {
        mode,
        entry: paths.entry,
        // output одержит набор параметров, указывающих веб-пакету, как и где он должен выводить ваши пакеты, ресурсы и все остальное, что вы собираете или загружаете с помощью веб-пакета.
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            //  автоматически обновлять все URL при генерации production-сборок, что-бы в ручную не писать
            publicPath: '/', // тобы devServer понимал где находиться главный index.html/ publicPath: '/' должен указывать корень проекта // откуда на сервере загрузить пакет // тначе он из билда будет брать путь а там  path: paths.build
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        // Указываем правила для данных модулей
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
