import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    email: { type: String, default: null, unique: true, lowercase: true },
    password: { type: String, default: null },
    googleId: { type: String, default: null },
    profilePhoto: { type: String, default: null },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
