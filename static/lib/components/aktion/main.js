import { aktionen, permissions } from "/lib/apiLoader.js";

export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.title = this.document.getElementById("title");
    this.workHours = this.document.getElementById("workHours");
    this.description = this.document.getElementById("description");
    this.join = this.document.getElementById("join");
    this.leave = this.document.getElementById("leave");
    this.delete = this.document.getElementById("delete");
    this.abgeschlossen = this.document.getElementById("abgeschlossen");

    this.join.addEventListener("click", async () => {
      await aktionen.joinAktion(cookie.key, this.id);
      location.reload();
    });

    this.leave.addEventListener("click", async () => {
      await aktionen.leaveAktion(cookie.key, this.id);
      location.reload();
    });

    this.delete.addEventListener("click", async () => {
      await aktionen.deleteAktion(cookie.key, this.id);
      location.reload();
    });

    this.abgeschlossen.addEventListener("click", async () => {
      await aktionen.aktionDone(cookie.key, this.id);
      location.reload();
    });
  }

  async loadAktion() {
    let aktion = (await aktionen.getAktion(cookie.key, this.id)).aktion;
    this.title.innerText = aktion.name;
    this.workHours.innerText = aktion.workHours + " Arbeitsstunde(n)";
    this.description.innerText = aktion.description;
    for (let user of aktion.users) {
      let userElem = document.createElement("a-user");
      userElem.innerText = user;
      userElem.slot = "content";
      this.abgeschlossen.parentElement.insertBefore(
        userElem,
        this.abgeschlossen
      );
    }

    if (aktion.joined) this.leave.style.display = "block";
    else if (aktion.users.length < aktion.userCount && !aktion.cantJoin)
      this.join.style.display = "block";

    let permission = await permissions.permission(cookie.key, "editAktionen");
    if (permission.success) {
      this.delete.style.display = "block";
      this.abgeschlossen.style.display = "block";
    }
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "id":
        this.id = newValue;
        this.loadAktion();
        break;
    }
  }
}
