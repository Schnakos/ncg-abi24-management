import { MongoClient } from "mongodb";
import config from "@proxtx/config";

const client = new MongoClient(config.dbUrl);
await client.connect();
export const db = client.db(config.db);
export default db;

export const genId = (length = 10) => {
  let chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890".split("");
  let res = "";
  for (let i = 0; i < length; i++) {
    res += chars[Math.floor(Math.random() * chars.length)];
  }

  return res;
};
