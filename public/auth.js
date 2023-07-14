import { uIdByUsername, getUser } from "../private/db/user.js";
import { createKey, checkKey } from "../private/db/key.js";

export const auth = async (username, password) => {
  let uId = await uIdByUsername(username);
  if (!uId.success) return uId;
  uId = uId.uId;
  let user = await getUser(uId, true);
  if (!user.success) return user;
  user = user.user;
  if (user.password == password) return { success: true, uId };
  return { success: false, error: 1 };
};

export const genKey = async (username, password) => {
  let authResult = await auth(username, password);
  if (!authResult.success) return authResult;
  let key = await createKey(authResult.uId);
  return key;
};

export const key = async (key) => {
  let keyResult = await checkKey(key);
  if (!keyResult.success) return { success: false, error: 1 };
  return keyResult;
};
