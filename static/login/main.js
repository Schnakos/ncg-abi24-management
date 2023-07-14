import { auth } from "../lib/apiLoader.js";

const username = document.getElementById("username");
const password = document.getElementById("password");
const signIn = document.getElementById("signIn");

signIn.addEventListener("click", async () => {
  const key = await auth.genKey(
    username.component.value.trim(),
    password.component.value
  );
  if (!key.success) {
    alert("Benutzername oder Kennwort ist falsch");
    password.component.value = "";
    return;
  }
  cookie.key = key.key;
  location.pathname = "/home/";
});
