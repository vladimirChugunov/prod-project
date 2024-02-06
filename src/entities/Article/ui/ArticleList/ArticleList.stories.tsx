import type { Meta, StoryObj } from '@storybook/react';
import { ArticleList } from './ArticleList';

const meta: Meta<typeof ArticleList> = {
    title: 'shared/ArticleList',
    component: ArticleList,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};

export default meta;

type Story = StoryObj<typeof ArticleList>;

export const Primary: Story = {
    args: {},
};
