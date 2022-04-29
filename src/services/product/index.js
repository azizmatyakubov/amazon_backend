import express from "express";
import createError from "http-errors";
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
    const product = await productmodel.findById(req.params.productId);
    res.send(product);
  } catch (error) {
    next(createError(404, `Product with ${req.params.productId} not found!`));
  }
});
// =====================================
productRouter.put("/:productId", async (req, res, next) => {
  try {
    const modify = await productmodel(req.params.productId, req.body, {
      new: true,
      runValidators: true,
    });
    res.send();
  } catch (error) {
    next(createError(404, `Product with Id${req.params.productId} not found!`));
  }
});
// =====================================
productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const delet = await productmodel.findByIdAndDelete(req.params.productId);
    res.send();
  } catch (error) {
    next(createError(404, `Product with Id${req.params.productId} not found!`));
  }
});
productRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    const product = await productmodel.findById(req.params.productId);
    if (product) {
      res.send(product.reviews);
    } else {
      next(
        createError(404, `Product with Id${req.params.productId} not found!`)
      );
    }
  } catch (error) {
    next(createError(404, `Product with Id${req.params.productId} not found!`));
  }
});
// =====================================
export default productRouter;
