import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
    title: 'features/LoginForm',
    component: LoginForm,
    parameters: {
        layout: 'start',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const LoginFormLight: Story = {};
LoginFormLight.decorators = [StoreDecorator({ loginForm: { userName: 'admin', password: '123' } })];

export const LoginFormDark: Story = {};
LoginFormDark.decorators = [StoreDecorator({ loginForm: { userName: 'admin', password: '123' } })];

export const WithError: Story = {};
WithError.decorators = [StoreDecorator({ loginForm: { userName: 'admin', password: '123', error: 'ERROR' } })];

export const Loading: Story = {};
Loading.decorators = [StoreDecorator({ loginForm: { isLoading: true } })];
