import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof Checkbox> = {
  title: 'AODA/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'Native checkbox with label association, indeterminate state, and error display. CheckboxGroup wraps multiple checkboxes in a fieldset with legend. Satisfies WCAG 1.3.1 (native checkbox + label + fieldset/legend), 1.4.11 (non-text contrast), 2.1.1 (keyboard toggle via Space), 2.4.7 (focus visible), 4.1.2 (aria-checked="mixed" for indeterminate).',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'I agree to the Terms of Service',
  },
};

export const Checked: Story = {
  args: {
    label: 'Receive email notifications',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'I agree to the Terms of Service',
    error: 'You must accept the terms to continue.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Premium features (upgrade required)',
    disabled: true,
  },
};

export const Group: Story = {
  render: () => (
    <CheckboxGroup legend="Notification preferences">
      <Checkbox label="Email" defaultChecked />
      <Checkbox label="SMS" />
      <Checkbox label="Push notifications" />
    </CheckboxGroup>
  ),
};

export const GroupWithError: Story = {
  render: () => (
    <CheckboxGroup legend="Notification preferences" error="Please select at least one option.">
      <Checkbox label="Email" />
      <Checkbox label="SMS" />
      <Checkbox label="Push notifications" />
    </CheckboxGroup>
  ),
};
