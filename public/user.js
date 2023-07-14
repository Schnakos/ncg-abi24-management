import { key } from "./auth.js";
import {
  getUser,
  search as userSearch,
  uIdByUsername as userUIdByUsername,
} from "../private/db/user.js";

export const getName = async (authKey, uId) => {
  let auth = await key(authKey);
  if (!auth.success) return auth;
  let user = await getUser(uId);
  if (!user.success) return user;
  user = user.user;
  return { success: true, surname: user.surname, name: user.name };
};

export const search = async (authKey, search) => {
  let auth = await key(authKey);
  if (!auth.success) return auth;
  return await userSearch(search);
};

export const uIdByUsername = async (authKey, username) => {
  let auth = await key(authKey);
  if (!auth.success) return auth;
  return await userUIdByUsername(username);
};
