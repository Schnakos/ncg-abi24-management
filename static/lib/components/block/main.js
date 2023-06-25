export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.img = this.document.getElementById("img");
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "src":
        this.img.src = newValue;
        break;
    }
  }
}
