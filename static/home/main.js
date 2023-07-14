import { money, permissions } from "../lib/apiLoader.js";

const moneyElem = document.getElementById("money");
const adminDivider = document.getElementById("adminDivider");
const logElem = document.getElementById("log");
const editMoney = document.getElementById("editMoney");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

const mqStandAlone = "(display-mode: standalone)";
if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
  document.getElementById("pwaTip").style.display = "none";
}

const refreshMoney = async () => {
  let status = await money.getMoney(cookie.key);
  status = status.money;

  moneyElem.setAttribute(
    "value",
    status.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "€"
  );
  moneyElem.setAttribute("progress", (status.current / status.goal) * 100);
};

refreshMoney();

let permissionEditMoney = (
  await permissions.permission(cookie.key, "editMoney")
).success;
let permissionEditWorkHours = (
  await permissions.permission(cookie.key, "editWorkHours")
).success;

if (permissionEditMoney || permissionEditWorkHours)
  adminDivider.style.display = "block";
if (permissionEditMoney) editMoney.style.display = "block";
if (permissionEditWorkHours) logElem.style.display = "block";
