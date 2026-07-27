import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const i = trimmed.indexOf("=");
    const key = trimmed.slice(0, i);
    let value = trimmed.slice(i + 1);
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const userSchema = new mongoose.Schema(
  {
    email: String,
    role: String,
  },
  { collection: "users" },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function main() {
  const uri = process.env.MONGODB_URI;
  const email = process.env.ADMIN_SEED_EMAIL || process.argv[2];

  if (!uri) throw new Error("MONGODB_URI is required in .env.local");
  if (!email) {
    throw new Error("Usage: node scripts/promote-admin.mjs you@email.com");
  }

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB_NAME || "consultvault",
  });

  const user = await User.findOneAndUpdate(
    { email: String(email).toLowerCase() },
    { role: "super_admin" },
    { returnDocument: "after" },
  );

  if (!user) {
    throw new Error(`No user found for email: ${email}. Register first.`);
  }

  console.log(`Promoted ${user.email} to role: ${user.role}`);
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error.message || error);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
