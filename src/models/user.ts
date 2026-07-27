import { compare, hash } from "bcryptjs";
import {
  Schema,
  models,
  model,
  type HydratedDocument,
  type Model,
  type Types,
} from "mongoose";

export const USER_ROLES = [
  "customer",
  "employee",
  "admin",
  "super_admin",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface IUser {
  name: string;
  email: string;
  emailVerified: Date | null;
  passwordHash?: string;
  image: string | null;
  role: UserRole;
  phone: string | null;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  verifyPassword(password: string): Promise<boolean>;
}

export interface UserModel extends Model<IUser, object, IUserMethods> {
  hashPassword(password: string): Promise<string>;
}

export type UserDocument = HydratedDocument<IUser, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    emailVerified: { type: Date, default: null },
    passwordHash: { type: String, select: false },
    image: { type: String, default: null },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "customer",
      index: true,
    },
    phone: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret: Record<string, unknown>) {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      },
    },
  },
);

userSchema.methods.verifyPassword = async function verifyPassword(
  this: UserDocument,
  password: string,
): Promise<boolean> {
  if (!this.passwordHash) return false;
  return compare(password, this.passwordHash);
};

userSchema.statics.hashPassword = async function hashPassword(
  password: string,
): Promise<string> {
  return hash(password, 12);
};

export const User =
  (models.User as UserModel | undefined) ??
  model<IUser, UserModel>("User", userSchema);

export type UserId = Types.ObjectId | string;
