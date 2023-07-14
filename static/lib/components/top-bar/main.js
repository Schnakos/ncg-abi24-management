import { auth, user } from "/lib/apiLoader.js";

export class Component {
  constructor(options) {
    this.options = options;
    this.document = options.shadowDom;
    this.user = this.document.getElementById("user");
    this.setUserName();
  }

  async setUserName() {
    let uId = (await auth.key(cookie.key)).uId;
    if (!uId) {
      this.user.innerText = "Anmelden";
      return;
    }
    let name = await user.getName(cookie.key, uId);
    this.user.innerText = name.name;
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "user-color":
        this.user.setAttribute("color", newValue);
        break;
    }
  }
}
