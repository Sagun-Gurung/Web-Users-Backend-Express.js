import { Student } from "../schema/model.js";

export let createStudentService = async (data) => {
  return await Student.create(data);
};

export let readAllStudentService = async () => {
  return await Student.find({});
};

export let readSpecificStudentService = async (id) => {
  await Student.findById(id);
};

export let updateStudentService = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export let deleteStudentService = async (id) => {
  return await Student.findByIdAndDelete(id);
};
