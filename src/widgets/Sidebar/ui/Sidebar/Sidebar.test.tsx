import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';

describe('Sidebar', () => {
    test('with only first param', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test toggle', () => {
        // враппер для того чтобы i18 n подтягивалась и роутинг
        componentRender(<Sidebar />);
        // находим кнопку по id
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        //  событие клика по кнопке
        fireEvent.click(toggleBtn);
        // Смотрим что у компонета сайд бар изменилисся класс свернуть по нажатию кнопки внутри компонета сайдбар
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
