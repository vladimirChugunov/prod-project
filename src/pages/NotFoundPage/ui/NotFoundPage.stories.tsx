import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { NotFoundPage } from './NotFoundPage';

const meta: Meta<typeof NotFoundPage> = {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
    parameters: {
        layout: 'start',
    },
    tags: ['autodocs'],
    args: {},
};

export default meta;

type Story = StoryObj<typeof NotFoundPage>;

export const NotFoundPageDark: Story = {};
NotFoundPageDark.decorators = [ThemeDecorator(Theme.DARK)];

export const NotFoundPageLight: Story = {};
NotFoundPageLight.decorators = [ThemeDecorator(Theme.LIGHT)];
