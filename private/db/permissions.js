import { db } from "./db.js";

export const hasPermission = async (uId, permission) => {
  let permissionDoc = (
    await db.collection("permissions").find({ uId }).toArray()
  )[0];
  if (!permissionDoc) return { success: false, error: 2 };
  if (permissionDoc.permissions[permission]) return { success: true, uId };
  return { success: false };
};
