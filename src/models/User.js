import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  socialOnly: { type: Boolean, default: false },
  location: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" }],
  videos: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Video"
  }]
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;