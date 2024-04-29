import { WebUser } from "../schema/model.js";

export let authorized = (roles) => {
  //roles =["admin", "superAdmin"]
  return async (req, res, next) => {
    try {
      let _id = req._id;
      let result = await WebUser.findById(_id);
      // console.log(result);
      let tokenRole = result.role;
      if (roles.includes(tokenRole)) {
        next();
      } else {
        res.status(403).json({
          success: true,
          message: "User not authorized",
        });
      }
    } catch (error) {
      res.status(403).json({
        success: true,
        message: "User not authorized",
      });
    }
  };
};
