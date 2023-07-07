import { MongoClient } from "mongodb";
import config from "@proxtx/config";

const client = new MongoClient(config.dbUrl);
await client.connect();
export const db = client.db(config.db);
