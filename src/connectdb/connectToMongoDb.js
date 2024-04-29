import mongoose from "mongoose";
import { db_url } from "../constant.js";

const connectToMongoDb = () => {
  mongoose.connect(db_url);
  console.log("application is connected to mongodb successfully.");
};

export default connectToMongoDb;
