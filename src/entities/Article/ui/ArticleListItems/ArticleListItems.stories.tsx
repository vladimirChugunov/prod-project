import type { Meta, StoryObj } from '@storybook/react';
import { ArticleListItems } from './ArticleListItems';

const meta: Meta<typeof ArticleListItems> = {
    title: 'shared/ArticleListItems',
    component: ArticleListItems,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};

export default meta;

type Story = StoryObj<typeof ArticleListItems>;

export const Primary: Story = {
    args: {},
};
