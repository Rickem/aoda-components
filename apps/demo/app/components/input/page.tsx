"use client";

import { Input } from "@aoda/ui";

export default function InputPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Input</h1>
      <p className="mt-2 text-gray-600">
        Text input with label association, error messaging, and helper text.
      </p>

      <section className="mt-8 max-w-sm space-y-6" aria-labelledby="examples-heading">
        <h2 id="examples-heading" className="text-lg font-semibold">Examples</h2>
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Email" helperText="We'll never share your email." placeholder="you@example.com" />
        <Input label="Email" error="Email address is required." placeholder="you@example.com" />
        <Input label="Email" required placeholder="you@example.com" />
        <Input label="Email" disabled placeholder="you@example.com" />
      </section>

      <section className="mt-8" aria-labelledby="keyboard-heading">
        <h2 id="keyboard-heading" className="text-lg font-semibold">Keyboard Test</h2>
        <p className="mt-2 text-sm text-gray-600">
          Tab to focus the input. Type to enter text. Focus ring should be visible. Screen readers should announce the label, required state, and error messages.
        </p>
      </section>
    </div>
  );
}
