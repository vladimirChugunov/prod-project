import type { Meta, StoryObj } from '@storybook/react';
import { ArticlesPageFilters } from './ArticlesPageFilters';

const meta: Meta<typeof ArticlesPageFilters> = {
    title: 'pages/Article/ArticlesPageFilters',
    component: ArticlesPageFilters,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};
export default meta;

type Story = StoryObj<typeof ArticlesPageFilters>;

export const Primary: Story = {
    args: {},
};
