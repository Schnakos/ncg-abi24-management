export class Component {
  constructor(options) {
    this.shadowDom = options.shadowDom;
    this.progress = this.shadowDom.getElementById("progress");
    this.value = this.shadowDom.getElementById("value");
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "progress":
        this.progress.style.width = Math.min(newValue,100) + "%";
        break;
      case "value":
        this.value.innerText = newValue;
        break;
    }
  }
}
