import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'shared/ThemeSwitcher',
    component: ThemeSwitcher,
    parameters: {
        layout: 'start',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const ThemeSwitcherLight: Story = {};
ThemeSwitcherLight.decorators = [ThemeDecorator(Theme.LIGHT)];

export const ThemeSwitcherDark: Story = {};
ThemeSwitcherDark.decorators = [ThemeDecorator(Theme.DARK)];
