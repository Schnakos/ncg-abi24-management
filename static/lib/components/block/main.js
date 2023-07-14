export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.img = this.document.getElementById("img");
    this.box = this.document.getElementById("box");
    this.box.addEventListener("click", () => {
      if (this.link) location.href = this.link;
    });
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "src":
        this.img.src = newValue;
        break;
      case "link":
        this.link = newValue;
        break;
    }
  }
}
