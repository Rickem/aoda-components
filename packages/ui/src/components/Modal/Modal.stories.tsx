import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'AODA/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          'Dialog built on Radix Dialog with focus trap, Escape to dismiss, and focus return to trigger. Satisfies WCAG 1.3.1 (role="dialog", aria-modal), 2.1.1 (keyboard operable), 2.1.2 (no keyboard trap — Escape exits), 2.4.3 (focus order), 2.4.7 (focus visible), 4.1.2 (aria-labelledby, aria-describedby).',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: 'Confirm Transfer',
    description: 'Are you sure you want to transfer $500.00 to your savings account?',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal {...args} open={open} onOpenChange={setOpen}>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithLongContent: Story = {
  args: {
    title: 'Terms of Service',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>View Terms</Button>
        <Modal {...args} open={open} onOpenChange={setOpen}>
          <div className="space-y-2 text-sm text-gray-700">
            <p>By opening this account, you agree to the following terms and conditions governing the use of your account.</p>
            <p>All deposits are insured by the CDIC up to $100,000 per eligible deposit category.</p>
            <p>You may close your account at any time by providing written notice to the branch.</p>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setOpen(false)}>I Understand</Button>
          </div>
        </Modal>
      </>
    );
  },
};
