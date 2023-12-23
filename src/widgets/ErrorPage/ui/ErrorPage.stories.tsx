import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ErrorPage } from 'widgets/ErrorPage/ui/ErrorPage';

const meta: Meta<typeof ErrorPage> = {
    title: 'widget/ErrorPage',
    component: ErrorPage,
    parameters: {
        layout: 'start',
    },
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ErrorPage>;

export const DarkErrorPage: Story = {};
export const LightErrorPage: Story = {};

DarkErrorPage.decorators = [ThemeDecorator(Theme.DARK)];
LightErrorPage.decorators = [ThemeDecorator(Theme.LIGHT)];
