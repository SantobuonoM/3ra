import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  lastname: String,
  direccion: String,
  email: String,
  avatar: String,
});

export const User = mongoose.model("User", userSchema);
