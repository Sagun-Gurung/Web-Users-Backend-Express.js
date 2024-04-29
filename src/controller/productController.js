import {
  createProductService,
  deleteProductService,
  readAllProductService,
  readSpecificProductService,
  updateProductService,
} from "../service/productService.js";

export let createProductController = async (req, res, next) => {
  try {
    let result = await createProductService(req.body);
    res.json({
      success: true,
      message: "Product created successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export let readAllProductController = async (req, res, next) => {
  try {
    let result = await readAllProductService();
    res.json({
      success: true,
      message: "Product read successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let readSpecificProductController = async (req, res, next) => {
  try {
    let result = await readSpecificProductService(req.params.id);
    console.log(result);

    res.json({
      success: true,
      message: "Product r successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let updateProductController = async (req, res, next) => {
  try {
    let result = await updateProductService(req.params.id, req.body);
    res.json({
      success: true,
      message: "Product update successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let deleteProductController = async (req, res, next) => {
  try {
    let result = await deleteProductService(req.params.id);
    res.json({
      success: true,
      message: "Product deleted successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
