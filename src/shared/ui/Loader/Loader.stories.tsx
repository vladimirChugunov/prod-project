import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
    title: 'shared/Loader',
    component: Loader,
    parameters: {
        layout: 'start',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const LoaderLight: Story = {};
LoaderLight.decorators = [ThemeDecorator(Theme.LIGHT)];

export const LoaderDark: Story = {};
LoaderDark.decorators = [ThemeDecorator(Theme.DARK)];
