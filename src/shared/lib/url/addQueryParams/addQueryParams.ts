export function getQueryParams(params: OptionalRecord<string, string>) {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([name, value]) => {
        if (value !== undefined) {
            searchParams.set(name, value);
        }
    });
    return `?${searchParams.toString()}`;
}

// Документируем описание для функции, при наведении на нее
/**
 * Функция добавления параметров строки запроса в URL
 * @param params
 */

export function addQueryParams(params: OptionalRecord<string, string>) {
    // Сконкотенированные параметры и старые и новые добавляем в строку запроса
    window.history.pushState(null, '', getQueryParams(params));
}

// Без тестирования
// export function addQueryParams(params: OptionalRecord<string, string>) {
// // querySearch В качестве ключа передаем название параметра, в качестве значения то что мы хотим в этот парамерт положить
// // {
// //     querySearch: 'kotlin';
// // }
//     // С помощью специально класа URLSearchParams мы создаем объект туда передаем сроку из query  параметра window.location.search
//     const searchParams = new URLSearchParams(window.location.search);
//     // пробегаемся по параметрам которые мы приняли аргуметном в этой функции и добовляем их к существующим параметрам, тоесть у searchParams
//     Object.entries(params).forEach(([name, value]) => {
//         if (value !== undefined) {
//             const searchParams = new URLSearchParams(window.location.search);
//             // Метод set() интерфейса URLSearchParams устанавливает значение поиска переданное пропсом с значнием поиска в обьете
//             // если его нет добавляет если есть удаляет дубль
//             searchParams.set(name, value);
//         }
//     });
//     // Сконкотенированные параметры и старые и новые добавляем в строку запроса
//     window.history.pushState(null, '', `?${searchParams.toString()}`);
// }
