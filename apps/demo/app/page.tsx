const components = [
  { name: "Button", href: "/components/button", description: "Primary, secondary, destructive variants with loading and icon-only states." },
  { name: "Input", href: "/components/input", description: "Text input with label association, error states, and helper text." },
  { name: "Checkbox", href: "/components/checkbox", description: "Checkbox with indeterminate state and group labeling via fieldset/legend." },
  { name: "Radio Group", href: "/components/radio-group", description: "Radio group with roving tabindex and arrow key navigation." },
  { name: "Select", href: "/components/select", description: "Dropdown with full keyboard navigation built on Radix Select." },
  { name: "Modal", href: "/components/modal", description: "Dialog with focus trap, focus return, and Escape to dismiss." },
  { name: "Form Validation", href: "/components/form-validation", description: "Inline error messaging with aria-live and error summary pattern." },
];

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">AODA-Compliant Component Library</h1>
      <p className="mt-4 text-lg text-gray-600">
        Accessible React components meeting WCAG 2.1 AA and AODA requirements.
        Every component is keyboard-operable, screen-reader tested, and
        documented with specific WCAG success criteria mappings.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Components</h2>
      <ul className="mt-4 grid gap-4">
        {components.map((component) => (
          <li key={component.name}>
            <a
              href={component.href}
              className="block rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary-300 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              <h3 className="font-semibold text-gray-900">{component.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{component.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
