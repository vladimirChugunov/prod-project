import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
    title: 'shared/Select',
    component: Select,
    parameters: {
        layout: 'right',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Primary: Story = {
    args: {
        label: 'Укажите значние',
        options: [
            { value: '1', content: 'Первый пункт' },
            { value: '2', content: 'Второй пункт' },
        ],
    },
};
