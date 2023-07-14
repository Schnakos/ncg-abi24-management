import { db, genId } from "./db.js";
import fs from "fs/promises";

let csv = await fs.readFile("users.csv", "utf8");
let csvSplit = csv.split("\n");
let users = [];
for (let entry of csvSplit) {
  let user = entry.split(",");
  user[1] = user[1].trim();
  user[1] = user[1].replace("\r", "");
  users.push({
    name: user[1],
    surname: user[0],
    username: `${user[0]
      .replaceAll(" ", "-")
      .toLowerCase()}.${user[1].toLowerCase()}`,
    uId: genId(),
    password: genId(6),
  });
}

await db.collection("users").insertMany(users);
