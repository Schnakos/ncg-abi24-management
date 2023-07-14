import db from "../private/db/db.js";
import { key } from "./auth.js";
import { getFullName } from "../private/db/user.js";

export const getKomitees = async (authKey) => {
  let auth = await key(authKey);
  if (!auth.success) return auth;
  let komitees = await db.collection("komitees").find({}).toArray();
  for (let komitee of komitees) {
    komitee.vorsitzender = (await getFullName(komitee.vorsitzender)).name;
    komitee.vizevorsitzender = (
      await getFullName(komitee.vizevorsitzender)
    ).name;
  }

  return { success: true, komitees };
};
