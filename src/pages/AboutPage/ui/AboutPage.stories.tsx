import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import AboutPage from './AboutPage';

const meta: Meta<typeof AboutPage> = {
    title: 'pages/AboutPage',
    component: AboutPage,
    parameters: {
        layout: 'start',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AboutPage>;

export const AboutPageDark: Story = {};
AboutPageDark.decorators = [ThemeDecorator(Theme.DARK)];

export const AboutPageLight: Story = {};
AboutPageLight.decorators = [ThemeDecorator(Theme.LIGHT)];
