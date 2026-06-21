"use client";

import { useState } from "react";
import { Select } from "@aoda/ui";

const countries = [
  { value: "ca", label: "Canada" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
];

export default function SelectPage() {
  const [value, setValue] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold">Select</h1>
      <p className="mt-2 text-gray-600">
        Dropdown built on Radix Select with full keyboard navigation.
      </p>

      <section className="mt-8 max-w-sm space-y-6" aria-labelledby="examples-heading">
        <h2 id="examples-heading" className="text-lg font-semibold">Examples</h2>
        <Select label="Country" options={countries} value={value} onValueChange={setValue} />
        <Select label="Country" options={countries} error="Country is required" />
        <Select label="Country" options={countries} required />
        <Select label="Country" options={countries} disabled />
      </section>

      <section className="mt-8" aria-labelledby="keyboard-heading">
        <h2 id="keyboard-heading" className="text-lg font-semibold">Keyboard Test</h2>
        <p className="mt-2 text-sm text-gray-600">
          Tab to focus. Enter or Space to open. Arrow keys to navigate. Enter to select. Escape to close.
        </p>
      </section>
    </div>
  );
}
