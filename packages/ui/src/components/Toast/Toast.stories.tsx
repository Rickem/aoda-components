import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, ToastProvider } from './Toast';
import { Button } from '../Button/Button';

const meta: Meta<typeof Toast> = {
  title: 'AODA/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component:
          'Toast notification built on Radix Toast with role="status" for info/success and role="alert" for errors, configurable auto-dismiss duration. Satisfies WCAG 1.3.1 (status/alert roles), 2.1.1 (dismiss button keyboard operable), 2.4.7 (focus visible on action and close buttons), 4.1.2 (live region semantics for screen reader announcement).',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    variant: { control: 'select', options: ['info', 'success', 'error'] },
    duration: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Info Toast</Button>
        <Toast
          open={open}
          onOpenChange={setOpen}
          title="Transfer initiated"
          description="Your transfer of $500.00 is being processed."
          variant="info"
        />
      </>
    );
  },
};

export const Success: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Success Toast</Button>
        <Toast
          open={open}
          onOpenChange={setOpen}
          title="Transfer complete"
          description="$500.00 has been transferred to your savings account."
          variant="success"
        />
      </>
    );
  },
};

export const Error: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>Show Error Toast</Button>
        <Toast
          open={open}
          onOpenChange={setOpen}
          title="Transfer failed"
          description="Insufficient funds. Please check your balance and try again."
          variant="error"
        />
      </>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Toast with Action</Button>
        <Toast
          open={open}
          onOpenChange={setOpen}
          title="Payment scheduled"
          description="Your mortgage payment of $1,850.00 is scheduled for June 30."
          variant="info"
          action={{
            label: 'Undo',
            onClick: () => setOpen(false),
          }}
        />
      </>
    );
  },
};

export const Persistent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Persistent Toast</Button>
        <Toast
          open={open}
          onOpenChange={setOpen}
          title="Session expiring"
          description="Your session will expire in 5 minutes. Save your work."
          variant="error"
          duration={Infinity}
        />
      </>
    );
  },
};
