import type { Meta, StoryObj } from '@storybook/react';
import AvatarImg from 'shared/assets/tests/avatarStories.jpg';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
    // Путь и название папки в сторибуке
    title: 'shared/Avatar',
    component: Avatar,
    // parameters: {
    //     layout: 'centered',
    // },
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
