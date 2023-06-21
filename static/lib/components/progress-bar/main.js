export class Component {
  constructor(options) {
    this.shadowDom = options.shadowDom;
    this.progress = this.shadowDom.getElementById("progress");
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "progress":
        this.progress.style.width = newValue + "%";
        break;
    }
  }
}
