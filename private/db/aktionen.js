import { db, genId } from "./db.js";
import { arbeitsstundenMax } from "../../public/arbeitsstunden.js";

import { getArbeitsstunden, requestArbeitsstunden } from "./arbeitsstunden.js";

export const createAktion = async (name, workHours, userCount, description) => {
  let id = genId();
  await db.collection("aktionen").insertOne({
    name,
    workHours,
    userCount,
    description,
    done: false,
    users: [],
    id,
  });

  return { success: true, id };
};

export const getAktion = async (id) => {
  let aktion = (await db.collection("aktionen").find({ id }).toArray())[0];
  if (!aktion) return { success: false, error: 2 };
  return { success: true, aktion };
};

export const listAktionen = async () => {
  return (
    await db
      .collection("aktionen")
      .find({ done: false })
      .project({ id: true })
      .toArray()
  ).map((v) => v.id);
};

export const joinAktion = async (uId, id) => {
  if ((await getArbeitsstunden(uId)).arbeitsstunden >= arbeitsstundenMax)
    return { success: false, error: 4 };

  let aktion = await getAktion(id);
  if (!aktion.success) return aktion;
  if (aktion.aktion.users.length >= aktion.aktion.userCount)
    return { success: false, error: 3 };
  let mod = (
    await db.collection("aktionen").updateOne({ id }, { $push: { users: uId } })
  ).modifiedCount;
  if (mod < 1) return { success: false, error: 2 };
  return { success: true };
};

export const leaveAktion = async (uId, id) => {
  let mod = (
    await db.collection("aktionen").updateOne({ id }, { $pull: { users: uId } })
  ).modifiedCount;
  if (mod < 1) return { success: false, error: 2 };
  return { success: true };
};

export const deleteAktion = async (id) => {
  let mod = (await db.collection("aktionen").deleteOne({ id })).modifiedCount;
  if (mod < 1) return { success: false, error: 2 };
  return { success: true };
};

export const aktionDone = async (id) => {
  let aktion = (await getAktion(id)).aktion;
  for (let user of aktion.users) {
    await requestArbeitsstunden(user, aktion.name, Number(aktion.workHours));
  }

  let mod = (
    await db.collection("aktionen").updateOne({ id }, { $set: { done: true } })
  ).modifiedCount;

  if (mod < 1) return { success: false, error: 2 };
  return { success: true };
};
