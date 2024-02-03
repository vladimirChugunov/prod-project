import type { Meta, StoryObj } from '@storybook/react';
import { ArticleImageBlockComponent } from './ArticleImageBlockComponent';

const meta: Meta<typeof ArticleImageBlockComponent> = {
    title: 'shared/ArticleImageBlockComponent',
    component: ArticleImageBlockComponent,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};

export default meta;

type Story = StoryObj<typeof ArticleImageBlockComponent>;

export const Primary: Story = {
    args: {},
};
