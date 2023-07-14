import { db, genId } from "./db.js";

export const createKey = async (uId) => {
  let key = genId(20);
  await db.collection("keys").insertOne({ uId, key, time: Date.now() });
  return { success: true, key };
};

export const checkKey = async (key) => {
  let uId = (
    await db.collection("keys").find({ key }).project({ uId: true }).toArray()
  )[0];
  if (!uId) return { success: false, error: 2 };
  return { success: true, uId: uId.uId };
};
