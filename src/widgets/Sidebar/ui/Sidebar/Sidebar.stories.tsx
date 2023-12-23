import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
    title: 'widget/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'start',
    },
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const DarkSidebar: Story = {};
export const LightSidebar: Story = {};

DarkSidebar.decorators = [ThemeDecorator(Theme.LIGHT)];
LightSidebar.decorators = [ThemeDecorator(Theme.DARK)];
