import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';
import { FormErrorSummary } from './FormErrorSummary';
import type { FormError } from './FormErrorSummary';

const meta: Meta<typeof FormField> = {
  title: 'AODA/FormValidation',
  component: FormField,
  parameters: {
    docs: {
      description: {
        component:
          'Form field wrapper and error summary pattern for accessible form validation. FormField satisfies WCAG 1.3.1 (label association), 3.3.1 (aria-live error announcement), 3.3.2 (labels/instructions), 4.1.2 (error id convention for aria-describedby). FormErrorSummary satisfies WCAG 1.3.1 (error list), 2.4.1 (links to errored fields), 3.3.1 (role="alert"), 3.3.3 (field name + specific message).',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    htmlFor: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    htmlFor: 'name',
    required: true,
  },
  render: (args) => (
    <FormField {...args}>
      <input
        id={args.htmlFor}
        name={args.htmlFor}
        type="text"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      />
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    htmlFor: 'email',
    error: 'Please enter a valid email address.',
    required: true,
  },
  render: (args) => (
    <FormField {...args}>
      <input
        id={args.htmlFor}
        name={args.htmlFor}
        type="email"
        aria-invalid={!!args.error}
        aria-describedby={args.error ? `${args.htmlFor}-error` : undefined}
        className="w-full rounded-md border border-red-600 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
      />
    </FormField>
  ),
};

export const ErrorSummary: Story = {
  render: () => {
    const errors: FormError[] = [
      { field: 'Full Name', fieldId: 'name', message: 'Name is required' },
      { field: 'Email', fieldId: 'email', message: 'Please enter a valid email address' },
    ];
    return <FormErrorSummary errors={errors} />;
  },
};

export const InteractiveForm: Story = {
  render: () => {
    const [errors, setErrors] = useState<FormError[]>([]);
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setSubmitted(true);
      const formData = new FormData(e.currentTarget);
      const newErrors: FormError[] = [];
      if (!formData.get('name')) {
        newErrors.push({ field: 'Full Name', fieldId: 'name', message: 'Name is required' });
      }
      if (!formData.get('email')) {
        newErrors.push({ field: 'Email', fieldId: 'email', message: 'Email is required' });
      }
      setErrors(newErrors);
    }

    return (
      <form onSubmit={handleSubmit} noValidate className="max-w-md space-y-4">
        <FormErrorSummary errors={errors} />
        <FormField
          label="Full Name"
          htmlFor="name"
          error={submitted ? errors.find((e) => e.fieldId === 'name')?.message : undefined}
          required
        >
          <input
            id="name"
            name="name"
            type="text"
            aria-invalid={submitted && errors.some((e) => e.fieldId === 'name') ? true : undefined}
            aria-describedby={submitted && errors.some((e) => e.fieldId === 'name') ? 'name-error' : undefined}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          />
        </FormField>
        <FormField
          label="Email"
          htmlFor="email"
          error={submitted ? errors.find((e) => e.fieldId === 'email')?.message : undefined}
          required
        >
          <input
            id="email"
            name="email"
            type="email"
            aria-invalid={submitted && errors.some((e) => e.fieldId === 'email') ? true : undefined}
            aria-describedby={submitted && errors.some((e) => e.fieldId === 'email') ? 'email-error' : undefined}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          />
        </FormField>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Submit
        </button>
      </form>
    );
  },
};
