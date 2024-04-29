import {
  createStudentService,
  deleteStudentService,
  readAllStudentService,
  readSpecificStudentService,
  updateStudentService,
} from "../service/studentService.js";

export let createStudent = async (req, res, next) => {
  try {
    let result = await createStudentService(req.body);
    res.json({
      success: true,
      message: "Student created successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export let readAllStudent = async (req, res, next) => {
  try {
    let result = await readAllStudentService();
    res.json({
      success: true,
      message: "Student read successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let readSpecificStudent = async (req, res, next) => {
  try {
    let result = await readSpecificStudentService(req.params.id);

    res.json({
      success: true,
      message: "Student read successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let updateStudent = async (req, res, next) => {
  try {
    let result = await updateStudentService(req.params.id, req.body);
    res.json({
      success: true,
      message: "Student update successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let deleteStudent = async (req, res, next) => {
  try {
    let result = await deleteStudentService(req.params.id);
    res.json({
      success: true,
      message: "Student deleted successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
