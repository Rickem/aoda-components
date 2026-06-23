import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'AODA/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'Text input with associated label, error and helper text, and required indication. Satisfies WCAG 1.3.1 (label association), 1.3.5 (autocomplete support), 1.4.3/1.4.11 (contrast), 2.1.1 (keyboard), 2.4.7 (focus visible), 3.3.1 (error identification via role="alert"), 3.3.2 (labels/instructions), 4.1.2 (aria-invalid, aria-required, aria-describedby).',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters.',
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    required: true,
    placeholder: 'Jane Doe',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    error: 'Please enter a valid email address.',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account ID',
    disabled: true,
    value: 'ACC-12345',
  },
};
