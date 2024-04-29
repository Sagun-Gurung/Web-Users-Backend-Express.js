import { Router } from "express";
export let traineesRouter = Router();

traineesRouter
  .route("/")
  .post((req, res, next) => {
    console.log("i am post method");
  })
  .get((req, res, next) => {
    console.log("i am get method");
  })
  .patch((req, res, next) => {
    console.log("i am patch method");
  })
  .delete((req, res, next) => {
    console.log("i am delete method");
  });
