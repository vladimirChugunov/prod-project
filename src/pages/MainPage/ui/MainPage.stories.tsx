import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import MainPage from './MainPage';

const meta: Meta<typeof MainPage> = {
    title: 'pages/MainPage',
    component: MainPage,
    parameters: {
        layout: 'start',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MainPage>;

export const MainPageDark: Story = {};
MainPageDark.decorators = [ThemeDecorator(Theme.DARK)];

export const MainPageLight: Story = {};
MainPageLight.decorators = [ThemeDecorator(Theme.LIGHT)];
