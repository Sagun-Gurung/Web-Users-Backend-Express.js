
import { Schema } from "mongoose";

let productSchema = Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  quantity: {
    required: true,
    type: Number,
  },
});

export default productSchema;

