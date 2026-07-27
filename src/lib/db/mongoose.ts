import mongoose from "mongoose";

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
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI. Add it in Vercel Project Settings → Environment Variables (and locally in .env.local).",
    );
  }
  return uri;
}

/**
 * Cached Mongoose connection for Next.js (dev HMR + serverless-safe).
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = assertMongoUri();
  const dbName = process.env.MONGODB_DB_NAME ?? "consultvault";

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName,
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
