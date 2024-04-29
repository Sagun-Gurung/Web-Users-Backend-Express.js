import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../constant.js";
import { WebUser } from "../schema/model.js";
import { sendEmail } from "../utils/sendMail.js";

export let createWebUser = async (req, res, next) => {
  try {
    let data = req.body;
    /* data = {
    "fullName": "Van Gogh",
    "email": "sekuwa@gmail.com",
    "password":"uguauwaauw8282#$$",
    "dob": "1918-01-11",
    "gender":"female",
    "role": "admin",
    "isVerifiedEmail": true
} */
    let hashPassword = await bcrypt.hash(data.password, 10);
    // console.log(hashPassword);
    data = {
      ...data,
      isVerifiedEmail: false,
      password: hashPassword,
    };
    let result = await WebUser.create(data);
    // console.log(result);

    // sending email with link => generate token first then frontend link and send mail
    // creating token
    let infoObj = {
      name: "Momo",
      _id: result._id,
    };
    let expiryInfo = { expiresIn: "365d" };
    let token = await jwt.sign(infoObj, secretKey, expiryInfo);
    //sending email
    await sendEmail({
      from: "'sag'<sagungurung614@gmail.com>",
      to: data.email,
      subject: "Account Create Web User 1",
      html: `<h1>Your account Web User 1 has been created successfully</h1>
      <a href = "http://localhost:3000/verify-email?token=${token}">
      http://localhost:3000/verify-email?token=${token}
      </a>`,
    });

    res.status(201).json({
      success: true,
      message: "Web User added successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    //get token
    let tokenString = req.headers.authorization;
    /* Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9tbyIsIl9pZCI6IjY1ZWM5NzNhNmI1MmU1YzcyNTYzNjkyYSIsImlhdCI6MTcxMDAwNDAyNiwiZXhwIjoxNzQxNTQwMDI2fQ.Zb-lvaNNQ-5jHgos38kqbxwaAkrEe66RXIZyHwRWrx8 */
    // console.log(webToken.split(" ")[1]);
    /* after split [
  'Bearer', -> [0]
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9tbyIsIl9pZCI6IjY1ZWM5NzNhNmI1MmU1YzcyNTYzNjkyYSIsImlhdCI6MTcxMDAwNDAyNiwiZXhwIjoxNzQxNTQwMDI2fQ.Zb-lvaNNQ-5jHgos38kqbxwaAkrEe66RXIZyHwRWrx8'
  [1]
] */

    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];
    //verify token
    let infoObj = await jwt.verify(token, secretKey); // if true it returns object
    // console.log(infoObj);
    let userId = infoObj._id;
    let result = await WebUser.findByIdAndUpdate(
      userId,
      { isVerifiedEmail: true },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Web User verified successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    // let data = req.body;
    let email = req.body.email;
    // let password = req.body.password;

    let user = await WebUser.findOne({ email: email });
    // console.log(user);
    if (user) {
      if (user.isVerifiedEmail) {
        let isValidPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isValidPassword) {
          let infoObj = {
            _id: user._id,
          };
          let expiryInfo = {
            expiresIn: "365d",
          };
          let token = await jwt.sign(infoObj, secretKey, expiryInfo);
          res.status(200).json({
            success: true,
            message: "User Login Successful",
            data: user,
            token: token,
          });
        } else {
          let error = new Error("Credential does not match");
          throw error;
        }
      } else {
        let error = new Error("Credential does not match");
        throw error;
      }
    } else {
      let error = new Error("Credential does not match");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let result = await WebUser.findById(_id);
    // console.log(user);
    res.json({
      success: true,
      message: "Profile read successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to read profile",
    });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let data = req.body;
    //update everything except fot email and pass if they send delete it
    delete data.email;
    delete data.password;

    // console.log(data);
    let result = await WebUser.findByIdAndUpdate(_id, data, { new: true });
    console.log(result);
    res.status(201).json({
      success: true,
      message: "Profile Updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to read profile",
    });
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    let _id = req._id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let data = await WebUser.findById(_id);
    let hashPassword = data.password;

    let isValidPassword = await bcrypt.compare(oldPassword, hashPassword);

    console.log(isValidPassword);

    if (isValidPassword) {
      let newHashPassword = await bcrypt.hash(newPassword, 10);

      let result = await WebUser.findByIdAndUpdate(
        _id,
        { password: newHashPassword },
        {
          new: true,
        }
      );
      res.status(201).json({
        success: true,
        message: " Password Updated Successfully",
        data: result,
      });
    } else {
      let error = new Error("Credential doesn't match");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readAllUser = async (req, res, next) => {
  try {
    let result = await WebUser.find({});
    res.status(200).json({
      success: true,
      message: " Here are the list of Web Users ",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readSpecificUser = async (req, res, next) => {
  try {
    let result = await WebUser.findById(req.params.id);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Here are the list of Web Users ",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await WebUser.findByIdAndUpdate(id, data, {
      new: true,
    });
    // console.log(result);
    res.status(201).json({
      success: true,
      message: "Web User updated",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await WebUser.findByIdAndDelete(id);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "Web User Deleted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    let email = req.body.email;
    let result = await WebUser.findOne({ email: email });
    // console.log(result)
    if (result) {
      let infoObj = {
        _id: result._id,
      };
      let expiresInfo = { expiresIn: "365d" };
      let token = await jwt.sign(infoObj, secretKey, expiresInfo);

      await sendEmail({
        from: "Potato'<sagungurung614@gmail.com>",
        to: result.email,
        subject: "Reset Password",
        html: `<h1>Please click the given link to reset password</h1>
        <a href = "http://localhost:3000/reset-password?token=${token}">
        http://localhost:3000/reset-password?token=${token}
        </a>`,
      });
      res.status(200).json({
        success: true,
        message: "Link to reset password has been sent to your email",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Email does not exist",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    let _id = req._id; //sent from token
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let result = await WebUser.findByIdAndUpdate(
      _id,
      { password: hashPassword },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "Password reset successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
