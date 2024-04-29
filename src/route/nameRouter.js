import { Router } from "express";

export let nameRouter = Router();

nameRouter
  .route("/")
  .post((req, res, next) => {
    // localhost:8000/name
    // console.log("name post");
    res.json("name post");
  })
  .get((req, res, next) => {
    res.json("name get");
  })
  .patch((req, res, next) => {
    res.json("name update");
  })
  .delete((req, res, next) => {
    res.json("name delete");
  });
