import { db, genId } from "./db.js";
import { getUser } from "./user.js";

export const getArbeitsstunden = async (uId) => {
  let arbeitsstundenEntry = await db
    .collection("arbeitsstunden")
    .find({ uId })
    .toArray();

  if (arbeitsstundenEntry[0])
    return {
      success: true,
      arbeitsstunden: arbeitsstundenEntry[0].arbeitsstunden,
    };
  return { success: true, arbeitsstunden: 0 };
};

export const modifyArbeitsstunden = async (uId, update) => {
  let user = await getUser(uId);
  if (!user.success) return user;
  let count = await db.collection("arbeitsstunden").countDocuments({ uId });
  if (count < 1)
    await db
      .collection("arbeitsstunden")
      .insertOne({ uId, arbeitsstunden: update });
  else
    await db.collection("arbeitsstunden").updateOne(
      { uId },
      {
        $inc: {
          arbeitsstunden: update,
        },
      }
    );

  return { success: true };
};

export const requestArbeitsstunden = async (uId, reason, amount) => {
  let user = await getUser(uId);
  if (!user.success) return user;
  let id = genId();
  await db.collection("requests").insertOne({ uId, reason, amount, id });
  return { success: true, id };
};

export const listRequests = async () => {
  return {
    success: true,
    requests: (
      await db.collection("requests").find().project({ id: true }).toArray()
    ).map((v) => v.id),
  };
};

export const getRequest = async (id) => {
  let res = await db.collection("requests").find({ id }).toArray();
  if (res.length < 1) return { success: false, error: 2 };
  return { success: true, request: res[0] };
};

export const deleteRequest = async (id) => {
  let mod = (await db.collection("requests").deleteOne({ id })).modifiedCount;
  if (mod < 1) return { success: false, error: 2 };
  return { success: true };
};
