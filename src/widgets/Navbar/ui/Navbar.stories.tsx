import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
    title: 'widget/Navbar',
    component: Navbar,
    parameters: {
        layout: 'start',
    },
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const DarkNavbar: Story = {};
export const LightNavbar: Story = {};

export const AuthNavbar: Story = {};

AuthNavbar.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({ user: { authData: {} } })];
DarkNavbar.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({})];
LightNavbar.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
