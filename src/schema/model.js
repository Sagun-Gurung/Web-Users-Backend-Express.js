// define array => moobjectdel
// name,object
// Student = [
//     {name:"nitan", age:29, isMarried:false},
//     ....
// ]

import { model } from "mongoose";
import studentSchema from "./studentSchema.js";
import teacherSchema from "./teacherSchema.js";
import productSchema from "./productSchema.js";
import webUserSchema from "./webUserSchema.js";

export let Student = model("Student", studentSchema);
export let Teacher = model("Teacher", teacherSchema);
export let Product = model("Product", productSchema);
export let WebUser = model("WebUser", webUserSchema);

/* 
first letter of model name must be capital and singular
variable name and model name must be same
*/
