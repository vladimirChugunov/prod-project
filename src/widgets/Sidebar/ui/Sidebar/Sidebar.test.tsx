import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';
import { renderWithTranslation }
    from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';

describe('Sidebar', () => {
    test('with only first param', () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test toggle', () => {
        // враппер для того чтобы i18 n подтягивалась
        renderWithTranslation(<Sidebar />);
        // находим кнопку по id
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        //  событие клика по кнопке
        fireEvent.click(toggleBtn);
        // Смотрим что у компонета сайд бар изменилисся класс свернуть по нажатию кнопки внутри компонета сайдбар
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
