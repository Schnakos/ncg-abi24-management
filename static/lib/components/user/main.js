export class Component {
  constructor(config) {
    this.document = config.shadowDom;
    this.img = this.document.getElementById("img");
    this.userName = this.document.getElementById("userName");
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "order":
        this.document
          .getElementById("wrap")
          .appendChild(this.document.getElementById("img"));
        break;
      case "color":
        this.img.src = "/lib/img/userLight.svg";
        this.userName.style.color = "var(--backgroundColor2)";
        break;
    }
  }
}
