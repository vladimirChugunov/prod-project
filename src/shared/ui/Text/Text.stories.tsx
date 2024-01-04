import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Text, TextTheme } from '../Text/Text';

const meta: Meta<typeof Text> = {
    // Путь и название папки в сторибуке
    title: 'shared/Text',
    component: Text,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    // Общее arg для всех сразу состояний добавит, что-бы отдельно для каждого не прописывать
    args: {},
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Primary: Story = {
    args: {
        title: 'Title Lorem ipsum',
        text: 'Description Description Description Description Description',
    },
};

export const Error: Story = {
    args: {
        title: 'Title Lorem ipsum',
        text: 'Description Description Description Description Description',
        theme: TextTheme.ERROR,
    },
};

export const onlyTitle: Story = {
    args: {
        title: 'Title Lorem ipsum',
    },
};

export const onlyText: Story = {
    args: {
        text: 'Description Description Description Description Description',
    },
};

export const PrimaryDark: Story = {
    args: {
        title: 'Title Lorem ipsum',
        text: 'Description Description Description Description Description',
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
export const onlyTitleDark: Story = {
    args: {
        title: 'Title Lorem ipsum',
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
export const onlyTextDark: Story = {
    args: {
        text: 'Description Description Description Description Description',
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
