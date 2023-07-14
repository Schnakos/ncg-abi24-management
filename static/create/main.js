import { aktionen } from "../lib/apiLoader.js";

const name = document.getElementById("name");
const workHours = document.getElementById("workHours");
const userCount = document.getElementById("userCount");
const description = document.getElementById("description");
const create = document.getElementById("create");

create.addEventListener("click", async () => {
  create.innerText = "Loading";
  await aktionen.createAktion(
    cookie.key,
    name.component.value,
    workHours.component.value,
    userCount.component.value,
    description.component.value
  );
  location.pathname = "/aktionen/";
});
