import db from "./db.js";

export const getUser = async (uId, password = false) => {
  let res = (
    await db
      .collection("users")
      .find({
        uId,
      })
      .project(!password && { password: false })
      .toArray()
  )[0];

  if (res) return { success: true, user: res };
  return { success: false, error: 2 };
};

export const uIdByUsername = async (username) => {
  let res = (
    await db
      .collection("users")
      .find({
        username,
      })
      .project({ uId: true })
      .toArray()
  )[0];

  if (res) return { success: true, uId: res.uId };
  return { success: false, error: 2 };
};

export const getFullName = async (uId) => {
  let user = await getUser(uId);
  if (!user.success) return user;
  user = user.user;
  return { success: true, name: user.name + " " + user.surname };
};

export const search = async (search) => {
  let res = await db
    .collection("users")
    .find({ username: { $regex: search } })
    .project({ username: true })
    .toArray();
  return { success: true, result: res.map((v) => v.username) };
};
