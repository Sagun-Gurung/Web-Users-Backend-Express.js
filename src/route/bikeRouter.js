import { Router } from "express";

export let bikeRouter = Router();

bikeRouter
  .route("/") //localhost:8000/bike
  .post(
    (req, res, next) => {
      console.log("i am normal middleware 1");

      let error = new Error("this is my 2 error");
      next(error);
    },
    (error, req, res, next) => {
      console.log("i am error middleware 1");
      console.log(error.message);
    },
    (req, res, next) => {
      console.log("i am normal middleware 2");
      next();
    },
    (error, req, res, next) => {
      console.log("i am error middleware 2");
    },
    (req, res, next) => {
      console.log("i am normal middleware 3");

      res.json({
        success: true,
        message: "bike created successfully",
      });
    }
  )
  .get((req, res, next) => {
    res.json("bike get");
  })
  .patch((req, res, next) => {
    res.json("bike update");
  })
  .delete((req, res, next) => {
    res.json("bike delete");
  });

bikeRouter
  .route("/name") //localhost:8000/bike/name
  .get((req, res, next) => {
    res.json("bike name get");
    res.json("hell");
  });

bikeRouter
  .route("/:id") //localhost:8000/bike/:id
  .get((req, res, next) => {
    console.log(req.params);

    /* 
    req.params = {
      id:1234
    }
    
    */

    /*
    req.query = {
      name="nitan"
      address="gagalphedi"

    }
    
    
    */
    res.json(req.query);
  });

bikeRouter
  .route("/:id1/name/:id2") //localhost:8000/bike/any/name/any
  .get((req, res, next) => {
    /* 
  {
    id1:"1234124",
    id2:"abc"

  }
  
  */
    res.json(req.params);
  });

//localhost:8000/bike/name
// get

/* 
localhost:8000/a/b?name=nitan&age=29&address=gagalphedi
url = route + query
route =localhost:8000/a/b
route = baseUrl+ route params
baseUrl = localhost:8000
query =name=nitan&age=29&address=gagalphedi



*/
