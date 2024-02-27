const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otpForVerify: { type: String },
  forgetOtp: { type: String },
  created_at: { type: Date, required: true, default: Date.now },
});

export const userModel = models.users || model("users", schema);
