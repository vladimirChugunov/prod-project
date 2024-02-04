import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleType } from '../types/article';
import { articleDetailsData } from '../selector/articleDetails';

describe('articleDetails.test', () => {
    test('should return data', () => {
        const data = {
            id: '1',
            title: 'Javascript news',
            subtitle: 'Что нового в JS за 2022 год?',
            img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
            views: 1022,
            createdAt: '26.02.2022',
            type: [ArticleType.IT],
        };
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data,
            },
        };

        expect(articleDetailsData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state data', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(articleDetailsData(state as StateSchema)).toEqual(undefined);
    });
});
