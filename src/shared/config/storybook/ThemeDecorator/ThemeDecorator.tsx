import { StoryFn } from '@storybook/react';
import ThemeProvider from 'app/providers/ThemeProvider/ui/ThemeProvider';
import { Theme } from 'app/providers/ThemeProvider';

//  Используем функцию обертку в нее передаем темы и ренедерим при помощи замыкания компонет обернутый в тему
export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) => {
    console.log(theme); // разобраться с темой
    return (
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    );
};
