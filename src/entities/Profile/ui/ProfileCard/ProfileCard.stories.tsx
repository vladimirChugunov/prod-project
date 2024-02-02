import type { Meta, StoryObj } from '@storybook/react';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import AvatarImg from 'shared/assets/tests/avatarStories.jpg';
import { ProfileCard } from './ProfileCard';

const meta: Meta<typeof ProfileCard> = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProfileCard>;

export const Primary = {
    argTypes: {
        data: {
            avatar: AvatarImg,
            username: 'admin',
            first: 'Владимир',
            lastname: 'Чугунов',
            age: 25,
            currency: Currency.EUR,
            country: Country.Russia,
            city: 'Sankt-Petersburg1',
        },
    },
};

export const WithError: Story = {
    args: {
        error: 'true',
    },
};

export const loading: Story = {
    args: {
        isLoading: true,
    },
};
