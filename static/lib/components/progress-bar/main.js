export class Component {
  constructor(options) {
    this.shadowDom = options.shadowDom;
    this.progress = this.shadowDom.getElementById("progress");
    this.value = this.shadowDom.getElementById("value");
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "progress":
        this.progress.style.width = newValue + "%";
        break;
      case "value":
        this.value.innerText = newValue;
        break;
    }
  }
}
