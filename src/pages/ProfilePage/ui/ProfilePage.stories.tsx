import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import ProfilePage from './ProfilePage';

const meta: Meta<typeof ProfilePage> = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    parameters: {
        layout: 'start',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProfilePage>;

export const ProfilePageDark: Story = {};
ProfilePageDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    profile: {
        form: {
            username: 'admin',
            first: 'Владимир',
            lastname: 'Чугунов',
            age: 25,
            currency: Currency.EUR,
            country: Country.Russia,
            city: 'Sankt-Petersburg1',
        },
    },
})];

export const ProfilePageLight: Story = {};
ProfilePageLight.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({
    profile: {
        form: {
            username: 'admin',
            first: 'Владимир',
            lastname: 'Чугунов',
            age: 25,
            currency: Currency.EUR,
            country: Country.Russia,
            city: 'Sankt-Petersburg1',
        },
    },
})];
