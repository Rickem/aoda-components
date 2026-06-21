import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";

// Radix UI uses scrollIntoView which jsdom doesn't implement
window.HTMLElement.prototype.scrollIntoView = () => {};

// Radix Toast uses matchMedia which jsdom doesn't implement
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Radix UI uses hasPointerCapture/releasePointerCapture/setPointerCapture
if (!window.HTMLElement.prototype.hasPointerCapture) {
  window.HTMLElement.prototype.hasPointerCapture = () => false;
}
if (!window.HTMLElement.prototype.releasePointerCapture) {
  window.HTMLElement.prototype.releasePointerCapture = () => {};
}
if (!window.HTMLElement.prototype.setPointerCapture) {
  window.HTMLElement.prototype.setPointerCapture = () => {};
}
