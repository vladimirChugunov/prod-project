import type { Meta, StoryObj } from '@storybook/react';
import AvatarImg from 'shared/assets/tests/avatarStories.jpg';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
    title: 'shared/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
    args: {
        size: 150,
        alt: 'Avatar',
        src: AvatarImg,
    },
};

export const Small: Story = {
    args: {
        size: 50,
        alt: 'Avatar',
        src: AvatarImg,
    },
};
