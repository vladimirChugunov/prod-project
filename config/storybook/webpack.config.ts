import webpack from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        entry: '',
        build: '',
        html: '',
        src: path.resolve(__dirname, '../', '../', 'src'),
    };
    config.resolve.modules.push(paths.src);
    config.resolve.extensions.push('.tsx', '.ts', '.js');
    // проходимся по всем модулям из buildLoaders ищем в условии для svgLoader добавляем новое правило и исклбючаем svg
    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module.rules.map((rule: webpack.RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }
        // если svg нет то возвращаем просто rule
        return rule;
    });
    config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    config.module.rules.push(buildCssLoader(true));
    config.plugins.push(new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify(''),
    }));

    return config;
};
