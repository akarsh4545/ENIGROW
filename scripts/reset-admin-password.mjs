import fs from "node:fs";
import path from "node:path";
import { hash } from "bcryptjs";
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
    passwordHash: String,
    isActive: Boolean,
  },
  { collection: "users" },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function main() {
  const uri = process.env.MONGODB_URI;
  const email = (process.env.ADMIN_RESET_EMAIL || process.argv[2] || "")
    .trim()
    .toLowerCase();
  const password = process.env.ADMIN_RESET_PASSWORD || process.argv[3] || "";

  if (!uri) throw new Error("MONGODB_URI is required in .env.local");
  if (!email || !password) {
    throw new Error(
      "Usage: ADMIN_RESET_PASSWORD='...' node scripts/reset-admin-password.mjs you@email.com",
    );
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  await mongoose.connect(uri, {
    dbName:
      (process.env.MONGODB_DB_NAME || "consultvault").trim() || "consultvault",
  });

  const passwordHash = await hash(password, 12);

  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        passwordHash,
        role: "super_admin",
        isActive: true,
      },
    },
    { returnDocument: "after" },
  );

  if (!user) {
    throw new Error(`No user found for email: ${email}. Register first.`);
  }

  console.log(`Password updated for ${user.email} (role: ${user.role}).`);
  console.log("Leads and other data were not modified.");
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error.message || error);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
