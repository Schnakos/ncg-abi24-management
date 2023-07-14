import * as arbeitsstunden from "../private/db/arbeitsstunden.js";
import { key } from "./auth.js";
import config from "@proxtx/config";
import { permission } from "./permissions.js";
import { getFullName, getUser } from "../private/db/user.js";

let log = [];

export const arbeitsstundenMax = config.arbeitsstundenMax;

export const getArbeitsstunden = async (authKey) => {
  let auth = await key(authKey);
  if (!auth.success) return auth;
  return await arbeitsstunden.getArbeitsstunden(auth.uId);
};

export const getArbeitsstundenAdmin = async (authKey, uId) => {
  let permissionCheck = await permission(authKey, "editWorkHours");
  if (!permissionCheck.success) return permissionCheck;
  return await arbeitsstunden.getArbeitsstunden(uId);
};

export const modifyArbeitsstunden = async (
  authKey,
  uId,
  amount,
  reason = "Unknown"
) => {
  let permissionCheck = await permission(authKey, "editWorkHours");
  if (!permissionCheck.success) return permissionCheck;
  updateLog(permissionCheck.uId, uId, reason, amount);
  return await arbeitsstunden.modifyArbeitsstunden(uId, amount);
};

const updateLog = async (admin, uId, reason, amount) => {
  log.push({
    admin: (await getUser(admin)).user.name,
    user: (await getUser(uId)).user.name,
    reason,
    amount,
    time: Date.now(),
  });

  if (log.length > 100) log.shift();
};

export const getLog = async (authKey) => {
  let permissionCheck = await permission(authKey, "editWorkHours");
  if (!permissionCheck.success) return permissionCheck;
  return { success: true, log };
};

export const requestArbeitsstunden = async (authKey, reason, amount) => {
  let auth = await key(authKey);
  if (!auth.success) return auth;
  return await arbeitsstunden.requestArbeitsstunden(
    auth.uId,
    reason,
    Number(amount)
  );
};

export const listRequests = async (authKey) => {
  let permissionCheck = await permission(authKey, "editWorkHours");
  if (!permissionCheck.success) return permissionCheck;
  return await arbeitsstunden.listRequests();
};

export const getRequest = async (authKey, id) => {
  let permissionCheck = await permission(authKey, "editWorkHours");
  if (!permissionCheck.success) return permissionCheck;
  let res = await arbeitsstunden.getRequest(id);
  if (!res.success) return res;
  res.request.name = (await getFullName(res.request.uId)).name;
  return res;
};

export const deleteRequest = async (authKey, id) => {
  let permissionCheck = await permission(authKey, "editWorkHours");
  if (!permissionCheck.success) return permissionCheck;
  return await arbeitsstunden.deleteRequest(id);
};
