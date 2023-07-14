import { arbeitsstunden } from "../lib/apiLoader.js";

const mainContent = document.getElementById("mainContent");

let arbeitsstundenLog = (await arbeitsstunden.getLog(cookie.key)).log;
arbeitsstundenLog = arbeitsstundenLog.reverse();

for (let logEntry of arbeitsstundenLog) {
  let entry = document.createElement("a-log");
  await uiBuilder.ready(entry);
  entry.component.setEntry(logEntry);
  mainContent.appendChild(entry);
}
