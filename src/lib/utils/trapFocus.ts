const trapFocus = (element: HTMLElement) => {
  const focusableEls = element.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), input[type="text"]:not([disabled]), input[type="search"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled])',
  );
  const firstFocusableEl = focusableEls[0] as HTMLElement;
  const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement;
  const KEYCODE_TAB = 9;

  element.addEventListener("keydown", function (event: KeyboardEvent) {
    const isTabPressed = event.key === "Tab" || event.keyCode === KEYCODE_TAB;

    if (!isTabPressed) {
      return;
    }

    if (event.shiftKey) {
      /* shift + tab */ if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        event.preventDefault();
      }
    } else if (document.activeElement === lastFocusableEl) {
      /* tab */ firstFocusableEl.focus();
      event.preventDefault();
    }
  });
};

export default trapFocus;
