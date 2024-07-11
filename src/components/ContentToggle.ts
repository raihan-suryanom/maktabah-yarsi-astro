class ContentToggle extends HTMLElement {
  static elementName = "content-toggle";

  static get observedAttributes() {
    return ["checked"];
  }

  originalChildren;
  toggleButton;
  isFirstToggle = true;

  constructor() {
    super();

    this.originalChildren = this.lastElementChild;
    this.toggleButton = this.querySelector("button") as HTMLButtonElement;

    this.lastElementChild?.remove();
  }

  connectedCallback() {
    this.toggleButton.setAttribute("role", "switch");
    this.toggleButton.setAttribute("tabindex", "0");
    this.toggleButton.addEventListener("click", this.toggle);
  }

  disconnectedCallback() {
    this.toggleButton.removeEventListener("click", this.toggle);
  }

  attributeChangedCallback(name: string) {
    if (name === "checked") {
      this.toggleButton.setAttribute("aria-checked", this.checked.toString());
      this.toggleButton.dispatchEvent(
        new CustomEvent("content-toggle:change", {
          detail: {
            checked: this.checked,
          },
        }),
      );
    }
  }

  get checked() {
    return this.toggleButton.hasAttribute("checked");
  }
  set checked(value) {
    this.toggleButton.toggleAttribute("checked", value);
  }

  toggle = () => {
    this.checked = !this.checked;

    if (this.checked) {
      const content = this.originalChildren as Element;

      if (this.isFirstToggle && this.dataset.display) {
        this.isFirstToggle = false;
        content.classList.add(this.dataset.display);
      }

      content.classList.remove("hidden");
      this.insertAdjacentElement("beforeend", content);
    } else {
      this.removeChild(this.lastElementChild!);
    }
  };
}

export default customElements.define(ContentToggle.elementName, ContentToggle);
