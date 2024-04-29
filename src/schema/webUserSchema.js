import { Schema } from "mongoose";

let webUserSchema = Schema(
  {
    fullName: {
      required: [true, "fullName field is required"],
      type: String,
      trim: true,
    },
    email: {
      unique: true,
      type: String,
      required: [true, "email field is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password field is required"],
      trim: true,
    },
    dob: {
      type: Date,
      required: [true, "DOB field is required"],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender field is required"],
      trim: true,
      default: "male",
    },
    role: {
      type: String,
      required: [true, "Role field is required"],
    },
    isVerifiedEmail: {
      type: Boolean,
      trim: true,
      required: [true, "isVerifiedEmail field is required"],
    },
  },
  { timestamps: true }
);

export default webUserSchema;
