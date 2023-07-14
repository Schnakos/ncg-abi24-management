import { aktionen, permissions } from "../lib/apiLoader.js";

const newButton = document.getElementById("new");

newButton.addEventListener("click", () => {
  location.pathname = "/create/";
});

const aktionsIds = await aktionen.listAktionen(cookie.key);

for (let aktionsId of aktionsIds) {
  let aktionsElem = document.createElement("a-aktion");
  aktionsElem.setAttribute("id", aktionsId);
  newButton.parentElement.insertBefore(aktionsElem, newButton);
}

if ((await permissions.permission(cookie.key, "editAktionen")).success)
  newButton.style.display = "block";
