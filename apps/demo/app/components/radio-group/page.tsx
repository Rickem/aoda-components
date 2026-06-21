"use client";

import { RadioGroup, RadioOption } from "@aoda/ui";

export default function RadioGroupPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Radio Group</h1>
      <p className="mt-2 text-gray-600">
        Radio group with roving tabindex and arrow key navigation.
      </p>

      <section className="mt-8 space-y-6" aria-labelledby="default-heading">
        <h2 id="default-heading" className="text-lg font-semibold">Default</h2>
        <RadioGroup legend="Preferred contact method" name="contact">
          <RadioOption label="Email" value="email" />
          <RadioOption label="Phone" value="phone" />
          <RadioOption label="Mail" value="mail" />
        </RadioGroup>
      </section>

      <section className="mt-8" aria-labelledby="error-heading">
        <h2 id="error-heading" className="text-lg font-semibold">With Error</h2>
        <RadioGroup legend="Plan" name="plan" error="Please select a plan">
          <RadioOption label="Free" value="free" />
          <RadioOption label="Pro" value="pro" />
          <RadioOption label="Enterprise" value="enterprise" />
        </RadioGroup>
      </section>

      <section className="mt-8" aria-labelledby="keyboard-heading">
        <h2 id="keyboard-heading" className="text-lg font-semibold">Keyboard Test</h2>
        <p className="mt-2 text-sm text-gray-600">
          Tab to enter the radio group. Use arrow keys to move between options. Space selects. Tab again to exit the group.
        </p>
      </section>
    </div>
  );
}
