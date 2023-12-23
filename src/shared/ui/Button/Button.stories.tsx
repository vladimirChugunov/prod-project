import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, ThemeButton } from './Button';

const meta: Meta<typeof Button> = {
    // Путь и нащвание папки в сторибуке
    title: 'shared/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    // Для PRIMARY, можем задавать свои значения например описание или цвет ,
    // Любое указанное вручную argtypes будет переопределять предполагаемые значения.(primary вместо него тут описываем общие ниже для каждого состояния в отдельности)
    // argTypes нужен для передачи агруметов типа тема, true/false.
    argTypes: {
        children: {
            control: 'text',
            description: 'Описание для DOCS',
        },
    },
    // Общее arg для всех сразу состояний добавит, что-бы отдельно для каждого не прописывать
    args: {},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Clear: Story = {
    args: {
        children: 'Text',
        theme: ThemeButton.CLEAR,
    },
};
export const OutlineDark: Story = {
    args: {
        children: 'Text',
        theme: ThemeButton.OUTLINE,
    },
};

OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
