import { StoryFn } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';

//  Используем функцию обертку в нее передаем темы и ренедерим при помощи замыкания компонет обернутый в тему
export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) => (
    <div className={`app ${theme}`}>
        <StoryComponent />
    </div>
);
