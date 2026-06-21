# AODA Components

An accessible React component library meeting **WCAG 2.1 AA** and **AODA** (Accessibility for Ontarians with Disabilities Act) requirements.

Every component is keyboard-operable, screen-reader tested, and documented with specific WCAG success criteria mappings in [ACCESSIBILITY.md](./ACCESSIBILITY.md).

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** + class-variance-authority for typed variants
- **Vite** (library mode) for the component package
- **Radix UI** headless primitives for Select, Modal, and Toast
- **Vitest** + React Testing Library + vitest-axe for accessibility testing

## Components

| Component | Description |
|---|---|
| Button | Primary, secondary, destructive variants with loading and icon-only states |
| Input | Text input with label association, error/helper text, required indication |
| Checkbox | Single checkbox with indeterminate state; group with fieldset/legend |
| RadioGroup | Radio group with roving tabindex and arrow key navigation |
| Select | Dropdown with full keyboard navigation (built on Radix Select) |
| Modal | Dialog with focus trap, Escape to dismiss, focus return (built on Radix Dialog) |
| FormField | Wrapper for form fields with error messaging and aria-live |
| FormErrorSummary | Summary-of-errors pattern with links to errored fields |

## Getting Started

### Install

```bash
pnpm add @aoda/ui
```

### Import

```tsx
import { Button, Input, Modal } from "@aoda/ui";
import "@aoda/ui/styles.css";
```

## Development

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Setup

```bash
pnpm install
```

### Run the demo app

```bash
pnpm demo:dev
```

Open [http://localhost:3000](http://localhost:3000).

### Run tests

```bash
pnpm test
```

### Build the library

```bash
pnpm build
```

## Accessibility

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for the complete WCAG 2.1 AA criteria mapping per component, including manual validation checklists.

## License

MIT
