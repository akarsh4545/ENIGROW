import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME ?? "consultvault";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export function assertMongoUri(): string {
  if (!MONGODB_URI) {
    throw new Error(
      "Missing MONGODB_URI. Add it to .env.local (see .env.example).",
    );
  }
  return MONGODB_URI;
}

/**
 * Cached Mongoose connection for Next.js (dev HMR + serverless-safe).
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = assertMongoUri();

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: MONGODB_DB_NAME,
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8_000,
      connectTimeoutMS: 8_000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    const message =
      error instanceof Error ? error.message : "Database connection failed";
    throw new Error(
      `Unable to reach the database. Callbacks can’t be saved until MongoDB is connected. (${message})`,
    );
  }

  return cached.conn;
}

export async function disconnectFromDatabase(): Promise<void> {
  if (!cached.conn) return;
  await mongoose.disconnect();
  cached.conn = null;
  cached.promise = null;
}

export function getConnectionState(): number {
  return mongoose.connection.readyState;
}

export { mongoose };
