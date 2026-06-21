"use client";

import { Button } from "@aoda/ui";

export default function ButtonPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Button</h1>
      <p className="mt-2 text-gray-600">
        Accessible button with variants, loading state, and icon-only support.
      </p>

      <section className="mt-8" aria-labelledby="variants-heading">
        <h2 id="variants-heading" className="text-lg font-semibold">Variants</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="sizes-heading">
        <h2 id="sizes-heading" className="text-lg font-semibold">Sizes</h2>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="states-heading">
        <h2 id="states-heading" className="text-lg font-semibold">States</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button iconOnly aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="keyboard-heading">
        <h2 id="keyboard-heading" className="text-lg font-semibold">Keyboard Test</h2>
        <p className="mt-2 text-sm text-gray-600">
          Tab to focus each button. Press Enter or Space to activate. Focus ring should be visible on all variants.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button onClick={() => alert("Primary clicked!")}>Tab here first</Button>
          <Button variant="secondary" onClick={() => alert("Secondary clicked!")}>Then here</Button>
          <Button variant="destructive" onClick={() => alert("Destructive clicked!")}>Then here</Button>
        </div>
      </section>
    </div>
  );
}
