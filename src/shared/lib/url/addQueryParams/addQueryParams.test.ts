import { getQueryParams } from './addQueryParams';

describe('shared/url/addQueryParams', () => {
    test('test with one params', () => {
        // Передаем в функцию параметры
        const params = getQueryParams({
            search: 'value',
        });
        // Сравниваем, что передали и ожидаем
        expect(params).toBe('?search=value');
    });
    test('test with multiple params', () => {
        const params = getQueryParams({
            search: 'value',
            sort: '2',
        });
        expect(params).toBe('?search=value&sort=2');
    });
    test('test with with undefined', () => {
        const params = getQueryParams({
            search: 'value',
            sort: undefined,
        });
        expect(params).toBe('?search=value');
    });
});
