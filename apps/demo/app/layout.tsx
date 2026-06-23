import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AODA Components — Accessible React UI Library",
  description:
    "A WCAG 2.1 AA compliant React component library for AODA compliance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <header className="border-b border-gray-200 px-6 py-4">
          <nav aria-label="Main navigation" className="flex items-center justify-between">
            <a href="/" className="text-lg font-bold text-gray-900">
              AODA Components
            </a>
            <a
              href="/storybook/index.html"
              className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              Storybook
            </a>
          </nav>
        </header>
        <main id="main-content" className="mx-auto max-w-4xl px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
