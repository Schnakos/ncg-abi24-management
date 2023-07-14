import { db } from "../private/db/db.js";
import { key } from "./auth.js";
import { permission } from "./permissions.js";

export const getMoney = async (authKey) => {
  let auth = await key(authKey);
  if (!auth.success) return auth;
  let money = (await db.collection("money").find().toArray())[0];
  return { success: true, money };
};

export const setMoney = async (authKey, money) => {
  let permissionCheck = await permission(authKey, "editMoney");
  if (!permissionCheck.success) return permissionCheck;
  await db.collection("money").updateOne(
    {},
    {
      $set: {
        current: money,
      },
    }
  );
  return { success: true };
};
