import express from "express";
import createError from "http-errors";
import productmodel from "./model.js";

import review from "../reviews/model.js";
// =====================================
const productRouter = express.Router();
// =====================================
productRouter.post("/:productId/reviews", async (req, res, next) => {
  try {
    const product = await productmodel.findById(req.params.productId);
    if (product) {
      const newReview = await new review({
        ...req.body,
        productId: req.params.productId,
      }).save();

      const { reviews } = await productmodel.findByIdAndUpdate(
        req.params.productId,
        {
          $push: { reviews: newReview._id },
        },
        { new: true }
      );
      res.send(reviews);
    }
  } catch (error) {
    console.log(error);
    next(createError(500, error.message));
  }
});
// =====================================
productRouter.get("/", async (req, res, next) => {
  try {
    const getproduct = await productmodel.find().populate("reviews");

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
    const modify = await productmodel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
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
    // .populate({ path: "reviews", select: "_id comment rate " });
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
