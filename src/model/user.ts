import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, default: null },
  lastname: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
});

export default mongoose.model("User", userSchema);
