import { komitees } from "../lib/apiLoader.js";

const content = document.getElementById("content");

let fetchedKomitees = (await komitees.getKomitees(cookie.key)).komitees;

content.innerHTML = "";

for (let komitee of fetchedKomitees) {
  const box = document.createElement("a-box");
  const title = document.createElement("a");
  title.slot = "title";
  title.innerText = komitee.komitee;
  box.appendChild(title);
  const vorsitzender = document.createElement("a-user");
  vorsitzender.slot = "content";
  vorsitzender.innerText = komitee.vorsitzender;
  box.appendChild(vorsitzender);
  const vizevorsitzender = document.createElement("a-user");
  vizevorsitzender.slot = "content";
  vizevorsitzender.innerText = komitee.vizevorsitzender;
  box.appendChild(vizevorsitzender);
  content.appendChild(box);
  await new Promise((r) => setTimeout(r, 50));
}
