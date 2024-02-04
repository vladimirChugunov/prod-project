import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';

const meta: Meta<typeof Code> = {
    title: 'shared/Code',
    component: Code,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Primary: Story = {
    args: {
        text: 'const meta: Meta<typeof Code> = {\n'
            + "    title: 'shared/Code',\n"
            + '    component: Code,\n'
            + "    tags: ['autodocs'],\n"
            + '    argTypes: {},\n'
            + '    args: {},\n'
            + '};\n'
            + '\n'
            + 'export default meta;\n'
            + '\n'
            + 'type Story = StoryObj<typeof Code>;',
    },
};
