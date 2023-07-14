import { hasPermission } from "../private/db/permissions.js";
import { key } from "./auth.js";

export const permission = async (authKey, permission) => {
  let auth = await key(authKey);
  if (!auth.success) return auth;
  return await hasPermission(auth.uId, permission);
};
