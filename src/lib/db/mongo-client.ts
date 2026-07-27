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

/**
 * Lazily create the Mongo client so Next.js / Vercel builds do not require
 * MONGODB_URI at module-evaluation time (only when the promise is awaited).
 */
function getClientPromise(): Promise<MongoClient> {
  if (!global.mongoClientPromise) {
    global.mongoClientPromise = createClientPromise();
  }
  return global.mongoClientPromise;
}

const clientPromise = {
  then<TResult1 = MongoClient, TResult2 = never>(
    onfulfilled?:
      ((value: MongoClient) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ) {
    return getClientPromise().then(onfulfilled, onrejected);
  },
  catch<TResult = never>(
    onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null,
  ) {
    return getClientPromise().catch(onrejected);
  },
  finally(onfinally?: (() => void) | null) {
    return getClientPromise().finally(onfinally ?? undefined);
  },
  get [Symbol.toStringTag]() {
    return "Promise";
  },
} as Promise<MongoClient>;

export default clientPromise;
