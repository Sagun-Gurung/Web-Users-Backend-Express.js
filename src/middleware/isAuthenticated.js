import jwt from "jsonwebtoken";
import { secretKey } from "../constant.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    //get token from postman
    let tokenString = req.headers.authorization;
    // console.log(tokenString);

    let tokenArray = tokenString.split(" ")[1];
    // console.log(tokenArray);
    let user = await jwt.verify(tokenArray, secretKey);
    // console.log(user)
    req._id = user._id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token Not Valid",
    });
  }
};
