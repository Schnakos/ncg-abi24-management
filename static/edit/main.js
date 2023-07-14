import { user, arbeitsstunden } from "../lib/apiLoader.js";

let u = new URL(location.href);

const username = u.searchParams.get("user");
const uId = (await user.uIdByUsername(cookie.key, username)).uId;
const name = (await user.getName(cookie.key, uId)).name;

const currentWorkHours = document.getElementById("arbeitsstunden");
const add = document.getElementById("add");
const remove = document.getElementById("remove");
const title = document.getElementById("title");

title.innerText = "Arbeitsstunden von " + name;

add.addEventListener("click", async () => {
  add.innerHTML = "...";
  await arbeitsstunden.modifyArbeitsstunden(cookie.key, uId, 1, "Manuell");
  await updateCurrentWorkHours();
  add.innerHTML = "+1";
});

remove.addEventListener("click", async () => {
  remove.innerHTML = "...";
  await arbeitsstunden.modifyArbeitsstunden(cookie.key, uId, -1, "Manuell");
  await updateCurrentWorkHours();
  remove.innerHTML = "-1";
});

const updateCurrentWorkHours = async () => {
  let currentArbeitsstunden = (
    await arbeitsstunden.getArbeitsstundenAdmin(cookie.key, uId)
  ).arbeitsstunden;
  let arbeitsstundenMax = await arbeitsstunden.arbeitsstundenMax;
  currentWorkHours.setAttribute("value", currentArbeitsstunden);
  currentWorkHours.setAttribute(
    "progress",
    (currentArbeitsstunden / arbeitsstundenMax) * 100
  );
};

updateCurrentWorkHours();
