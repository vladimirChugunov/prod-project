import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'shared/ui/Text/Text';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
    title: 'shared/Card',
    component: Card,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Primary: Story = {
    args: {
        children: <Text title="Title" text="Text text text text text text" />,
    },
};
