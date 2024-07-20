import trapFocus from "~/lib/utils/trapFocus";

const overlay =
  "<div class='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm dark:bg-slate-950/80 pointer-events-auto' aria-hidden='true' />";

class Modal extends HTMLElement {
  static elementName = "modal-popup";

  originalChildren;
  toggleButton;
  closeButton: HTMLButtonElement | undefined;
  isFirstToggle = true;

  constructor() {
    super();

    this.originalChildren = this.lastElementChild;
    this.lastElementChild?.remove();
    this.toggleButton = this.querySelector("button") as HTMLButtonElement;
  }

  connectedCallback() {
    this.toggleButton.addEventListener("click", this.toggle);
  }

  disconnectedCallback() {
    this.toggleButton.removeEventListener("click", this.toggle);
  }

  esc = (event: KeyboardEvent) => {
    if (event.key === "Escape" || event.keyCode == 27) {
      this.dismissModal();
    }
  };

  toggle = () => {
    this.toggleButton.disabled = true;
    this.toggleButton.setAttribute("aria-disabled", "true");
    const content = this.originalChildren as HTMLElement;

    if (this.isFirstToggle && this.dataset.display) {
      this.isFirstToggle = false;
      content.classList.add(this.dataset.display);
    }

    content.classList.remove("hidden");
    content.setAttribute("tabindex", "-1");
    document.body.insertAdjacentHTML("beforeend", overlay);
    const modalPopup = document.body.insertAdjacentElement(
      "beforeend",
      content,
    ) as HTMLElement;
    trapFocus(content);

    (content.querySelector("input") as HTMLInputElement).focus();
    this.closeButton = document.body.querySelector(
      "button#close-button",
    ) as HTMLButtonElement;
    this.closeButton.addEventListener("click", this.dismissModal);
    modalPopup?.previousElementSibling?.addEventListener(
      "click",
      this.dismissModal,
    );
    window.addEventListener("keydown", this.esc);
  };

  dismissModal = () => {
    this.toggleButton.disabled = false;
    this.toggleButton.removeAttribute("aria-disabled");
    this.closeButton?.removeEventListener("click", this.dismissModal);
    window.removeEventListener("keydown", this.esc);
    document.body.removeChild(document.body.lastElementChild!);
    document.body.removeChild(document.body.lastElementChild!);
  };
}

export default customElements.define(Modal.elementName, Modal);
