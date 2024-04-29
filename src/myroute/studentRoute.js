import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  readAllStudent,
  readSpecificStudent,
  updateStudent,
} from "../controller/studentController.js";

let studentRouter = Router();

studentRouter
  .route("/") //localhost:8000/students
  .post(createStudent)
  .get(readAllStudent);

studentRouter
  .route("/:id") //localhost:8000/students/1234234
  .get(readSpecificStudent)
  .patch(updateStudent)
  .delete(deleteStudent);

export default studentRouter;
