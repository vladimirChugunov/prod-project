import type { Meta, StoryObj } from '@storybook/react';
import { ArticleViewSelector } from './ArticleViewSelector';

const meta: Meta<typeof ArticleViewSelector> = {
    title: 'shared/ArticleViewSelector',
    component: ArticleViewSelector,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};

export default meta;

type Story = StoryObj<typeof ArticleViewSelector>;

export const Primary: Story = {
    args: {},
};
