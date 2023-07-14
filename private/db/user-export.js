import db from "./db.js";
import fs from "fs/promises";

let res = await db
  .collection("users")
  .find({})
  .project({ username: true, password: true })
  .toArray();
res = res.map((v) => {
  return v.username + ": " + v.password;
});

res = res.join("\n");
await fs.writeFile("Benutzer Daten.txt", res);
