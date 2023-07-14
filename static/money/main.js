import { money } from "../lib/apiLoader.js";

const moneyElem = document.getElementById("money");
const moneyInput = document.getElementById("updatedMoney");
const moneyButton = document.getElementById("updateMoney");

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

moneyButton.addEventListener("click", async () => {
  let p = money.setMoney(cookie.key, moneyInput.component.value);
  moneyInput.component.value = "";
  await p;
  await refreshMoney();
  moneyInput.component.value = 0;
});
