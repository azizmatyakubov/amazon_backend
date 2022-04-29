import express from "express";
import createError from "http-errors";
import ReviewsModel from "./model.js";

const reviewsRouter = express.Router();

///////////
reviewsRouter.post("/", async (req, res, next) => {
  try {
    const newReview = await ReviewsModel(req.body);
    const { _id } = await newReview.save();
    res.send({ _id });
  } catch (error) {
    next(error);
  }
});
///////////
reviewsRouter.get("/", async (req, res, next) => {
  try {
    const review = await ReviewsModel.find();
    if (review) {
      res.status(200).send(review);
    } else {
      next(createError(404, "There isn't any review available"));
    }
  } catch (error) {
    next(error);
  }
});
///////////
reviewsRouter.get("/:reviewId", async (req, res, next) => {
  try {
    // const updatedReview = await ReviewsModel.findByIdAndUpdate(req.params.blogId, { $push: { comments: req.body } }, { new: true })

    if (updatedReview) {
      res.status(201).send(updatedReview);
    } else {
      next(createError(404, "There isn't any review available"));
    }
  } catch (error) {
    next(error);
  }
});
///////////
reviewsRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const updatedReview = await ReviewsModel.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      { new: true, runValidators: true }
    );
    res.send(updatedReview);
  } catch (error) {
    next(error);
  }
});
///////////
reviewsRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const reviewToDelete = await ReviewsModel.findByIdAndDelete(
      req.params.reviewId
    );
    if (reviewToDelete) {
      res.status(201).send("RIP");
    } else {
      next(createError(404, "There isn't any review to delete here"));
    }
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
