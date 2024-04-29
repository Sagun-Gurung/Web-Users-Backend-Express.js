import { Schema } from "mongoose";
let teacherSchema = Schema({
  name: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
});
export default teacherSchema;
