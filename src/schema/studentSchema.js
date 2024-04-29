import { Schema } from "mongoose";

let studentSchema = Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
  isMarried: {
    required: true,
    type: Boolean,
  },
});

export default studentSchema;

//object => Schema
//array => model
