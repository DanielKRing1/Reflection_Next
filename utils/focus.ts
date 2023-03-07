export const nothingFocused = (): boolean =>
  !document.hasFocus() ||
  document.activeElement === null ||
  document.activeElement === document.body ||
  document.activeElement === document.documentElement;
