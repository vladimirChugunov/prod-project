import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
    title: 'shared/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Primary: Story = {
    args: {
        width: '100%',
        height: 200,
    },
};
Primary.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Circle: Story = {
    args: {
        border: '50%',
        width: 100,
        height: 100,
    },
};

Circle.decorators = [ThemeDecorator(Theme.LIGHT)];

export const PrimaryDark: Story = {
    args: {
        border: '50%',
        width: 100,
        height: 100,
    },
};

export const CircleDark: Story = {
    args: {
        border: '50%',
        width: 100,
        height: 100,
    },
};
