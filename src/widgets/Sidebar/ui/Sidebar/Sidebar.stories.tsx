import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Counter } from './Counter';

const meta: Meta<typeof Counter> = {
    title: 'widget/Sidebar',
    component: Counter,
    parameters: {
        layout: 'start',
    },
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Counter>;

export const DarkSidebar: Story = {};
export const LightSidebar: Story = {};

DarkSidebar.decorators = [ThemeDecorator(Theme.LIGHT)];
LightSidebar.decorators = [ThemeDecorator(Theme.DARK)];
