import { Product } from "../schema/model.js";

export let createProductService = async (data) => {
  return await Product.create(data);
};

export let readAllProductService = async () => {
  return await Product.find({});
};

export let readSpecificProductService = async (id) => {
    return  await Product.findById(id);
};

export let updateProductService = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export let deleteProductService = async (id) => {
  return await Product.findByIdAndDelete(id);
};
