import { MongoClient } from "mongodb";

import { assertMongoUri } from "@/lib/db/mongoose";

declare global {
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const uri = assertMongoUri();
  const client = new MongoClient(uri, {
    appName: "Enigrow",
  });
  return client.connect();
}

const clientPromise = global.mongoClientPromise ?? createClientPromise();

if (process.env.NODE_ENV !== "production") {
  global.mongoClientPromise = clientPromise;
}

export default clientPromise;
