import express from "express";
import createHttpError from "http-errors";
import productmodel from "./model.js";
// =====================================
const productRouter = express.Router();
// =====================================
productRouter.post("/", async (req, res, next) => {
  try {
    const product = await productmodel(req.body);
    const { _id } = await product.save();
    res.send({ _id });
  } catch (error) {
    next(createError(404, "Product page not found!"));
  }
});
// =====================================
productRouter.get("/", async (req, res, next) => {
  try {
    const getproduct = await productmodel
      .find()
      .populate({ path: "reviews", select: " _id comment rate" });
    res.send(getproduct);
  } catch (error) {
    next(createError(404, "Product page not found!"));
  }
});
// =====================================
productRouter.get("/:productId", async (req, res, next) => {
  try {
    res.send();
  } catch (error) {
    next(createError(404, "Product page not found!"));
  }
});
// =====================================
productRouter.put("/:productId", async (req, res, next) => {
  try {
    res.send();
  } catch (error) {
    next(createError(404, "Product page not found!"));
  }
});
// =====================================
productRouter.delete("/:productId", async (req, res, next) => {
  try {
    res.send();
  } catch (error) {
    next(createError(404, "Product page not found!"));
  }
});
// =====================================
export default productRouter;
