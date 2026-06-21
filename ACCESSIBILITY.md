# Accessibility — WCAG 2.1 AA Criteria Mapping

This document maps each component in @aoda/ui to the specific WCAG 2.1 AA success criteria it satisfies, with concrete explanations of how each criterion is met.

All components are tested with:
- **Automated:** vitest-axe (zero violations per visual state)
- **Keyboard:** full keyboard operability verified via React Testing Library
- **Screen reader:** ARIA roles, names, and states verified in automated tests; manual NVDA pass per component

---

## Button

| WCAG Criterion | Level | How Satisfied |
|---|---|---|
| 1.3.1 Info and Relationships | A | Uses native `<button>` element; role is implicit |
| 1.4.3 Contrast (Minimum) | AA | All variants meet 4.5:1 contrast ratio for button text |
| 1.4.11 Non-text Contrast | AA | Focus ring and button borders meet 3:1 against background |
| 2.1.1 Keyboard | A | Activates on Enter and Space via native `<button>` behavior |
| 2.4.7 Focus Visible | AA | Visible focus ring using `focus-visible:ring-2` on all variants |
| 4.1.2 Name, Role, Value | A | Accessible name from text children; `aria-label` required for icon-only; `aria-busy` for loading state; `aria-disabled` for disabled state |

### Manual validation checklist
- [ ] NVDA announces "Button, [label]" on focus
- [ ] NVDA announces "busy" when loading
- [ ] Focus ring visible on primary, secondary, and destructive variants
- [ ] Icon-only button announces aria-label, not icon content

---

## Input

| WCAG Criterion | Level | How Satisfied |
|---|---|---|
| 1.3.1 Info and Relationships | A | `<label>` element with `htmlFor` association to `<input>` |
| 1.3.5 Identify Input Purpose | AA | Supports `autocomplete` attribute pass-through |
| 1.4.3 Contrast (Minimum) | AA | Label, input text, error text all meet 4.5:1 |
| 1.4.11 Non-text Contrast | AA | Input border and focus ring meet 3:1 |
| 2.1.1 Keyboard | A | Natively focusable `<input>` element |
| 2.4.7 Focus Visible | AA | Visible focus ring using `focus-visible:ring-2` |
| 3.3.1 Error Identification | A | Error text rendered with `role="alert"`, visually styled in red |
| 3.3.2 Labels or Instructions | A | Label always rendered and visible; required fields indicated with asterisk |
| 4.1.2 Name, Role, Value | A | `aria-invalid` when error present; `aria-required` when required; `aria-describedby` links to error and helper text |

### Manual validation checklist
- [ ] NVDA announces label when input is focused
- [ ] NVDA announces "required" for required inputs
- [ ] NVDA announces "invalid entry" and reads error message
- [ ] NVDA announces helper text as part of description
- [ ] Focus ring visible in default and error states

---

## Checkbox

| WCAG Criterion | Level | How Satisfied |
|---|---|---|
| 1.3.1 Info and Relationships | A | Native `<input type="checkbox">` with `<label>` association; groups use `<fieldset>` with `<legend>` |
| 1.4.11 Non-text Contrast | AA | Checkbox border meets 3:1 against background |
| 2.1.1 Keyboard | A | Toggles on Space via native checkbox behavior |
| 2.4.7 Focus Visible | AA | Visible focus ring using `focus-visible:ring-2` |
| 4.1.2 Name, Role, Value | A | Native checkbox role; `aria-checked="mixed"` for indeterminate state; accessible name from label |

### Manual validation checklist
- [ ] NVDA announces "checkbox, [label], not checked" on focus
- [ ] NVDA announces "checked" after Space press
- [ ] NVDA announces "half checked" or "mixed" for indeterminate
- [ ] Group legend announced when entering checkbox group
- [ ] Focus ring visible

---

## RadioGroup

| WCAG Criterion | Level | How Satisfied |
|---|---|---|
| 1.3.1 Info and Relationships | A | `<fieldset>` with `<legend>` and `role="radiogroup"` for group labeling; native `<input type="radio">` |
| 1.4.11 Non-text Contrast | AA | Radio button border meets 3:1 |
| 2.1.1 Keyboard | A | Tab enters group, Arrow keys move between options, Space selects |
| 2.4.7 Focus Visible | AA | Visible focus ring on focused radio option |
| 4.1.2 Name, Role, Value | A | Native radio role; `aria-checked` state managed automatically; group name from legend |

### Manual validation checklist
- [ ] NVDA announces "radio group, [legend]" when entering group
- [ ] NVDA announces "radio button, [label], 1 of 3" on each option
- [ ] Arrow keys move focus and selection between options
- [ ] Tab exits the group entirely (does not cycle within)

---

## Select

| WCAG Criterion | Level | How Satisfied |
|---|---|---|
| 1.3.1 Info and Relationships | A | Radix Select provides `role="combobox"` on trigger and `role="listbox"` on content with `role="option"` items |
| 1.4.3 Contrast (Minimum) | AA | Trigger text and option text meet 4.5:1 |
| 1.4.11 Non-text Contrast | AA | Trigger border and focus ring meet 3:1 |
| 2.1.1 Keyboard | A | Enter/Space opens; Arrow keys navigate; Enter selects; Escape closes |
| 2.4.7 Focus Visible | AA | Focus ring on trigger; highlighted state on focused option |
| 3.3.1 Error Identification | A | Error text rendered below trigger |
| 4.1.2 Name, Role, Value | A | `aria-labelledby` links to visible label; `aria-expanded` indicates open state; `aria-invalid` and `aria-required` when applicable |

### Manual validation checklist
- [ ] NVDA announces "combobox, [label], collapsed" on focus
- [ ] NVDA announces "expanded" when opened
- [ ] NVDA announces each option as focus moves with arrows
- [ ] NVDA announces "collapsed" after selection or Escape
- [ ] Type-ahead works (typing "U" jumps to "United States")

---

## Modal

| WCAG Criterion | Level | How Satisfied |
|---|---|---|
| 1.3.1 Info and Relationships | A | Radix Dialog provides `role="dialog"` with `aria-modal="true"` |
| 2.1.1 Keyboard | A | All interactive elements inside are keyboard-operable |
| 2.1.2 No Keyboard Trap | A | Escape closes the dialog; focus returns to trigger. Focus cycles within dialog while open (trapped by design, not a trap — exit via Escape) |
| 2.4.3 Focus Order | A | Focus moves to dialog on open; returns to trigger on close |
| 2.4.7 Focus Visible | AA | Focus ring on all focusable elements inside dialog |
| 4.1.2 Name, Role, Value | A | `aria-labelledby` links to title; `aria-describedby` links to description when provided |

### Manual validation checklist
- [ ] NVDA announces "dialog, [title]" when modal opens
- [ ] NVDA reads description if provided
- [ ] Tab cycles only through elements inside the modal
- [ ] Escape closes and NVDA returns to trigger context
- [ ] Background content not reachable via Tab or screen reader

---

## FormField

| WCAG Criterion | Level | How Satisfied |
|---|---|---|
| 1.3.1 Info and Relationships | A | `<label>` with `htmlFor` links to input; error `id` enables `aria-describedby` linking |
| 3.3.1 Error Identification | A | Errors rendered with `aria-live="polite"` for non-disruptive announcement |
| 3.3.2 Labels or Instructions | A | Label always visible; required indicator shown |
| 4.1.2 Name, Role, Value | A | Error id follows `{htmlFor}-error` convention for consumer `aria-describedby` linking |

### Manual validation checklist
- [ ] NVDA announces label when field is focused
- [ ] NVDA announces error when it appears (via aria-live)
- [ ] Required indicator visible but decorative (aria-hidden)

---

## FormErrorSummary

| WCAG Criterion | Level | How Satisfied |
|---|---|---|
| 1.3.1 Info and Relationships | A | Errors listed in a `<ul>` with links to errored fields |
| 2.4.1 Bypass Blocks | A | Links jump directly to errored fields via fragment IDs |
| 3.3.1 Error Identification | A | `role="alert"` triggers immediate screen reader announcement |
| 3.3.3 Error Suggestion | AA | Each error includes the field name and a specific message |

### Manual validation checklist
- [ ] NVDA announces the error count and list when summary appears
- [ ] Each error link navigates to the corresponding field
- [ ] Summary does not appear when there are no errors
