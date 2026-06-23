import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup, RadioOption } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'AODA/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Radio group with fieldset/legend, roving tabindex, and arrow key navigation. Satisfies WCAG 1.3.1 (fieldset + legend + role="radiogroup"), 1.4.11 (non-text contrast), 2.1.1 (arrow keys move between options, Space selects), 2.4.7 (focus visible), 4.1.2 (native radio role, auto-managed aria-checked).',
      },
    },
  },
  argTypes: {
    legend: { control: 'text' },
    name: { control: 'text' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    legend: 'Payment method',
    name: 'payment',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioOption label="Credit card" value="credit" />
      <RadioOption label="Debit card" value="debit" />
      <RadioOption label="Bank transfer" value="bank" />
    </RadioGroup>
  ),
};

export const WithError: Story = {
  args: {
    legend: 'Payment method',
    name: 'payment-error',
    error: 'Please select a payment method.',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioOption label="Credit card" value="credit" />
      <RadioOption label="Debit card" value="debit" />
      <RadioOption label="Bank transfer" value="bank" />
    </RadioGroup>
  ),
};

export const WithPreselection: Story = {
  args: {
    legend: 'Account type',
    name: 'account',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioOption label="Personal" value="personal" defaultChecked />
      <RadioOption label="Business" value="business" />
      <RadioOption label="Joint" value="joint" />
    </RadioGroup>
  ),
};
