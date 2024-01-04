import { arbeitsstunden } from "/lib/apiLoader.js";

export class Component {
  constructor(options) {
    this.options = options;
    this.document = options.shadowDom;
    this.title = this.document.getElementById("title");
    this.reason = this.document.getElementById("reason");
    this.accept = this.document.getElementById("accept");
    this.dismiss = this.document.getElementById("dismiss");
    this.subtitle = this.document.getElementById("subtitle");

    this.accept.addEventListener("click", async () => {
      this.accept.innerText = "Loading";
      let res = await arbeitsstunden.modifyArbeitsstunden(
        cookie.key,
        this.request.uId,
        this.request.amount,
        this.request.reason
      );
      if (!res.success) return (this.accept.innerText = "Error");
      res = await arbeitsstunden.deleteRequest(cookie.key, this.request.id);
      if (!res.success) return (this.accept.innerText = "Error");
      this.options.component.parentElement.removeChild(this.options.component);
    });

    this.dismiss.addEventListener("click", async () => {
      this.accept.innerText = "Loading";
      let res = await arbeitsstunden.deleteRequest(cookie.key, this.request.id);
      if (!res.success) return (this.accept.innerText = "Error");
      this.options.component.parentElement.removeChild(this.options.component);
    });
  }

  async loadRequest() {
    let request = (await arbeitsstunden.getRequest(cookie.key, this.id))
      .request;
    this.request = request;
    this.title.innerText = request.name;
    this.reason.innerHTML = request.reason;
    this.subtitle.innerText = request.amount + " Arbeitsstunde(n)";
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "id":
        this.id = newValue;
        this.loadRequest();
        break;
    }
  }
}
