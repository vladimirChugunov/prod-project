import React from 'react';
import {
    Meta, StoryObj,
} from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from 'shared/ui/Modal/Modal';

const meta: Meta<typeof Modal> = {
    title: 'shared/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            description: 'Описание для DOCS',
        },
    },
    args: {},
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
    args: {
        isOpen: true,
        children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur eligendi impedit incidunt necessitatibus possimus quis saepe sunt totam.\n ',
    },
};

export const Dark: Story = {
    args: {
        isOpen: true,
        children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur eligendi impedit incidunt necessitatibus possimus quis saepe sunt totam.\n ',
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
