import { arbeitsstunden, permissions, user } from "../lib/apiLoader.js";

const currentWorkHours = document.getElementById("currentWorkHours");
const requestReason = document.getElementById("requestReason");
const requestAmount = document.getElementById("requestAmount");
const requestSend = document.getElementById("requestSend");
const mainContent = document.getElementById("mainContent");
const editSearch = document.getElementById("editSearch");
const searchResults = document.getElementById("searchResults");

editSearch.addEventListener("change", async () => {
  searchResults.innerHTML = "";
  let results = (
    await user.search(cookie.key, editSearch.component.value.toLowerCase())
  ).result;
  for (let result of results) {
    let user = document.createElement("a-user");
    user.innerText = result;
    user.addEventListener("click", () => {
      let u = new URL(location.href);
      u.pathname = "/edit/";
      u.searchParams.set("user", result);
      window.location = u;
    });
    searchResults.appendChild(user);
  }
});

requestSend.addEventListener("click", async () => {
  requestSend.innerText = "Lädt";
  await arbeitsstunden.requestArbeitsstunden(
    cookie.key,
    requestReason.component.value,
    requestAmount.component.value
  );
  requestSend.innerText = "Absenden";
});

const updateCurrentWorkHours = async () => {
  let currentArbeitsstunden = (
    await arbeitsstunden.getArbeitsstunden(cookie.key)
  ).arbeitsstunden;
  let arbeitsstundenMax = await arbeitsstunden.arbeitsstundenMax;
  currentWorkHours.setAttribute("value", currentArbeitsstunden);
  currentWorkHours.setAttribute(
    "progress",
    (currentArbeitsstunden / arbeitsstundenMax) * 100
  );
};

updateCurrentWorkHours();

const loadRequests = async () => {
  let requests = (await arbeitsstunden.listRequests(cookie.key)).requests;
  for (let request of requests) {
    let requestElem = document.createElement("a-request");
    requestElem.setAttribute("id", request);
    mainContent.appendChild(requestElem);
  }
};

if ((await permissions.permission(cookie.key, "editWorkHours")).success) {
  let elements = document.querySelectorAll(".editWorkHours");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "block";
  }

  loadRequests();
}
