import { Router } from "express";

export let firstRouter = Router();

firstRouter
  .route("/") //localhost:8000/first
  .post((req, res, next) => {
    res.json("home post");
  })
  .get((req, res, next) => {
    res.json("home get");
  })
  .patch((req, res, next) => {
    res.json("home update");
  })
  .delete((req, res, next) => {
    res.json("home delete");
  });
