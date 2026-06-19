import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";

// Radix UI uses scrollIntoView which jsdom doesn't implement
window.HTMLElement.prototype.scrollIntoView = () => {};

// Radix UI uses hasPointerCapture/releasePointerCapture
if (!window.HTMLElement.prototype.hasPointerCapture) {
  window.HTMLElement.prototype.hasPointerCapture = () => false;
}
if (!window.HTMLElement.prototype.releasePointerCapture) {
  window.HTMLElement.prototype.releasePointerCapture = () => {};
}
