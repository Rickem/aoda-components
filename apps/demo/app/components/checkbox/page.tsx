"use client";

import { Checkbox, CheckboxGroup } from "@aoda/ui";

export default function CheckboxPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Checkbox</h1>
      <p className="mt-2 text-gray-600">
        Checkbox with indeterminate state and group labeling via fieldset/legend.
      </p>

      <section className="mt-8 space-y-6" aria-labelledby="single-heading">
        <h2 id="single-heading" className="text-lg font-semibold">Single Checkbox</h2>
        <Checkbox label="I accept the terms and conditions" />
        <Checkbox label="Select all" indeterminate />
        <Checkbox label="Disabled option" disabled />
      </section>

      <section className="mt-8" aria-labelledby="group-heading">
        <h2 id="group-heading" className="text-lg font-semibold">Checkbox Group</h2>
        <CheckboxGroup legend="Notification preferences">
          <Checkbox label="Email notifications" />
          <Checkbox label="SMS notifications" />
          <Checkbox label="Push notifications" />
        </CheckboxGroup>
      </section>

      <section className="mt-8" aria-labelledby="error-heading">
        <h2 id="error-heading" className="text-lg font-semibold">With Error</h2>
        <CheckboxGroup legend="Terms" error="You must accept the terms to continue">
          <Checkbox label="I agree to the terms of service" />
        </CheckboxGroup>
      </section>
    </div>
  );
}
