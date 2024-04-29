import { Router } from "express";
import {
  createWebUser,
  deleteSpecificUser,
  forgotPassword,
  loginUser,
  myProfile,
  readAllUser,
  readSpecificUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateSpecificUser,
  verifyEmail,
} from "../controller/webUserController.js";
import { authorized } from "../middleware/authorized.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

let webUserRouter = Router();

webUserRouter
  .route("/")
  .post(createWebUser)
  .get(isAuthenticated, authorized("admin", "superAdmin"), readAllUser);
webUserRouter.route("/verify-email").patch(verifyEmail);
webUserRouter.route("/login").post(loginUser);
webUserRouter.route("/my-profile").get(isAuthenticated, myProfile);
webUserRouter.route("/update-profile").patch(isAuthenticated, updateProfile);
webUserRouter.route("/update-password").patch(isAuthenticated, updatePassword);
webUserRouter.route("/forgot-password").post(forgotPassword);
webUserRouter.route("/reset-password").patch(isAuthenticated, resetPassword);

webUserRouter
  .route("/:id")
  .get(isAuthenticated, authorized("admin", "superAdmin"), readSpecificUser)
  .patch(isAuthenticated, authorized("admin", "superAdmin"), updateSpecificUser)
  .delete(
    isAuthenticated,
    authorized("admin", "superAdmin"),
    deleteSpecificUser
  );

// webUserRouter.route("/login").post(loginWebUserController);

export default webUserRouter;
