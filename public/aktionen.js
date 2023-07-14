import { key } from "./auth.js";
import { permission } from "./permissions.js";
import * as aktionen from "../private/db/aktionen.js";
import { getFullName } from "../private/db/user.js";
import { arbeitsstundenMax } from "./arbeitsstunden.js";
import { getArbeitsstunden } from "../private/db/arbeitsstunden.js";

export const createAktion = async (
  authKey,
  name,
  workHours,
  userCount,
  description
) => {
  let permissionCheck = await permission(authKey, "editAktionen");
  if (!permissionCheck.success) return permissionCheck;
  return await aktionen.createAktion(name, workHours, userCount, description);
};

export const getAktion = async (authKey, id) => {
  let auth = await key(authKey);
  if (!auth.success) return auth;
  let aktion = await aktionen.getAktion(id);
  if (!aktion.success) return aktion;
  aktion.aktion.joined = aktion.aktion.users.includes(auth.uId);
  for (let userIndex in aktion.aktion.users) {
    aktion.aktion.users[userIndex] = (
      await getFullName(aktion.aktion.users[userIndex])
    ).name;
  }
  if ((await getArbeitsstunden(auth.uId)).arbeitsstunden >= arbeitsstundenMax)
    aktion.aktion.cantJoin = true;
  return aktion;
};

export const listAktionen = async (authKey) => {
  let auth = await key(authKey);
  if (!auth.success) return auth;
  return await aktionen.listAktionen();
};

export const joinAktion = async (authKey, id) => {
  let auth = await key(authKey);
  if (!auth.success) return auth;
  return await aktionen.joinAktion(auth.uId, id);
};

export const leaveAktion = async (authKey, id) => {
  let auth = await key(authKey);
  if (!auth.success) return auth;
  return await aktionen.leaveAktion(auth.uId, id);
};

export const deleteAktion = async (authKey, id) => {
  let permissionCheck = await permission(authKey, "editAktionen");
  if (!permissionCheck.success) return permissionCheck;
  return await aktionen.deleteAktion(id);
};

export const aktionDone = async (authKey, id) => {
  let permissionCheck = await permission(authKey, "editAktionen");
  if (!permissionCheck.success) return permissionCheck;
  return await aktionen.aktionDone(id);
};
