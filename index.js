import express, { json } from "express";
import connectToMongoDb from "./src/connectdb/connectToMongoDb.js";
import productRouter from "./src/myroute/productRoute.js";
import studentRouter from "./src/myroute/studentRoute.js";
import webUserRouter from "./src/myroute/webUserRouter.js";
import { bikeRouter } from "./src/route/bikeRouter.js";
import { firstRouter } from "./src/route/firstRouter.js";
import { nameRouter } from "./src/route/nameRouter.js";
import { traineesRouter } from "./src/route/traineesRouter.js";
import cors from "cors";
let expressApp = express();
expressApp.use(cors());
connectToMongoDb();
// console.log("hello");
// expressApp.use(
//   (req, res, next) => {
//     console.log("i am application, normal middleware 1");

//     let error = new Error("i am application error");
//     next(error);
//   },
//   (error, req, res, next) => {
//     console.log("i am application, error middleware 1");
//     console.log(error.message);
//     next();
//   },
//   (req, res, next) => {
//     console.log("i am application, normal middleware 2");
//     next();
//   }
// );

expressApp.use(json()); //it is done to make our application to accept json data
expressApp.use("/trainees", traineesRouter);
expressApp.use("/", firstRouter);
expressApp.use("/names", nameRouter);
expressApp.use("/bikes", bikeRouter);
expressApp.use("/students", studentRouter);
expressApp.use("/products", productRouter);
expressApp.use("/web-users", webUserRouter);

expressApp.listen(8000, () => {
  console.log("app is listening at port 8000");
});
