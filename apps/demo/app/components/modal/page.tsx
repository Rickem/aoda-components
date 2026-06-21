"use client";

import { useState } from "react";
import { Modal, Button } from "@aoda/ui";

export default function ModalPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold">Modal</h1>
      <p className="mt-2 text-gray-600">
        Dialog built on Radix with focus trap, Escape to dismiss, and focus return.
      </p>

      <section className="mt-8 space-y-4" aria-labelledby="examples-heading">
        <h2 id="examples-heading" className="text-lg font-semibold">Examples</h2>
        <div className="flex gap-4">
          <Button onClick={() => setBasicOpen(true)}>Open basic modal</Button>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Open confirm modal</Button>
        </div>

        <Modal open={basicOpen} onOpenChange={setBasicOpen} title="Basic Modal">
          <p className="text-sm text-gray-600">This is a basic modal with a title and content.</p>
        </Modal>

        <Modal
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Delete item?"
          description="This action cannot be undone."
        >
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setConfirmOpen(false)}>Delete</Button>
          </div>
        </Modal>
      </section>

      <section className="mt-8" aria-labelledby="keyboard-heading">
        <h2 id="keyboard-heading" className="text-lg font-semibold">Keyboard Test</h2>
        <p className="mt-2 text-sm text-gray-600">
          Open the modal. Tab should cycle only within the dialog. Escape closes it. Focus returns to the button that opened it.
        </p>
      </section>
    </div>
  );
}
