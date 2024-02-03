import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';

const meta: Meta<typeof ArticleCodeBlockComponent> = {
    title: 'shared/ArticleCodeBlockComponent',
    component: ArticleCodeBlockComponent,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};

export default meta;

type Story = StoryObj<typeof ArticleCodeBlockComponent>;

export const Primary: Story = {
    args: {},
};
