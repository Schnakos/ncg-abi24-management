export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.title = this.document.getElementById("title");
    this.subtitle = this.document.getElementById("subtitle");
    this.description = this.document.getElementById("description");
  }

  setEntry(entry) {
    this.title.innerText = `${entry.amount} Arbeitsstunde(n) an ${entry.user}`;
    this.subtitle.innerText = entry.admin;
    this.description.innerText =
      entry.reason + "\n\n" + new Date(entry.time).toLocaleTimeString();
  }
}
