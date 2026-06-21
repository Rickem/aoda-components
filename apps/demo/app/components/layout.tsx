const navItems = [
  { name: "Button", href: "/components/button" },
  { name: "Input", href: "/components/input" },
  { name: "Checkbox", href: "/components/checkbox" },
  { name: "Radio Group", href: "/components/radio-group" },
  { name: "Select", href: "/components/select" },
  { name: "Modal", href: "/components/modal" },
  { name: "Form Validation", href: "/components/form-validation" },
];

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-8">
      <nav aria-label="Components" className="w-48 shrink-0">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-1">{children}</div>
    </div>
  );
}
