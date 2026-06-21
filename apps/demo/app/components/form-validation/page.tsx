"use client";

import { useState } from "react";
import { Button, Input, FormField, FormErrorSummary } from "@aoda/ui";
import type { FormError } from "@aoda/ui";

export default function FormValidationPage() {
  const [errors, setErrors] = useState<FormError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newErrors: FormError[] = [];

    if (!formData.get("name")) {
      newErrors.push({ field: "Name", fieldId: "name", message: "Name is required" });
    }
    if (!formData.get("email")) {
      newErrors.push({ field: "Email", fieldId: "email", message: "Email is required" });
    }

    setErrors(newErrors);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Form Validation</h1>
      <p className="mt-2 text-gray-600">
        Inline error messaging with aria-live regions and error summary pattern.
      </p>

      <section className="mt-8 max-w-md" aria-labelledby="form-heading">
        <h2 id="form-heading" className="text-lg font-semibold">Example Form</h2>
        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
          <FormErrorSummary errors={errors} />
          <FormField label="Name" htmlFor="name" error={submitted ? errors.find(e => e.fieldId === "name")?.message : undefined} required>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              aria-invalid={submitted && errors.some(e => e.fieldId === "name") ? true : undefined}
              aria-describedby={submitted && errors.some(e => e.fieldId === "name") ? "name-error" : undefined}
            />
          </FormField>
          <FormField label="Email" htmlFor="email" error={submitted ? errors.find(e => e.fieldId === "email")?.message : undefined} required>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              aria-invalid={submitted && errors.some(e => e.fieldId === "email") ? true : undefined}
              aria-describedby={submitted && errors.some(e => e.fieldId === "email") ? "email-error" : undefined}
            />
          </FormField>
          <Button type="submit">Submit</Button>
        </form>
      </section>
    </div>
  );
}
