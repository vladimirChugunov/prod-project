import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

// Объекты в конфигурации, которые указывают на файлы, которые нужно обработать и указывают лоадер

export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'], // Указываем правило для каждого лоадера
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {},
    };
}
