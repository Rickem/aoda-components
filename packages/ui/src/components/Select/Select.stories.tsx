import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const sampleOptions = [
  { value: 'chequing', label: 'Chequing Account' },
  { value: 'savings', label: 'Savings Account' },
  { value: 'tfsa', label: 'TFSA' },
  { value: 'rrsp', label: 'RRSP' },
];

const meta: Meta<typeof Select> = {
  title: 'AODA/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'Dropdown select built on Radix Select with full keyboard navigation. Satisfies WCAG 1.3.1 (combobox/listbox/option roles), 1.4.3/1.4.11 (contrast), 2.1.1 (Enter/Space opens, arrows navigate, Enter selects, Escape closes), 2.4.7 (focus visible), 3.3.1 (error text), 4.1.2 (aria-labelledby, aria-expanded, aria-invalid, aria-required).',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: 'Transfer from',
    options: sampleOptions,
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Transfer from',
    placeholder: 'Choose an account...',
    options: sampleOptions,
  },
};

export const Required: Story = {
  args: {
    label: 'Transfer from',
    required: true,
    options: sampleOptions,
  },
};

export const WithError: Story = {
  args: {
    label: 'Transfer from',
    required: true,
    error: 'Please select an account.',
    options: sampleOptions,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Transfer from',
    disabled: true,
    options: sampleOptions,
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Transfer from',
    defaultValue: 'chequing',
    options: sampleOptions,
  },
};
