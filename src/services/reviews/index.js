import express from "express"
import createError from "http-errors"
import ReviewsModel from "./model.js"

const reviewsRouter = express.Router()

///////////
reviewsRouter.post("/", async (req, res, next) => {
  try {
    const newreview = new ReviewsModel(req.body).save()
    res.status(201).send(newreview.id)
  } catch (error) {
    next(error)
  }
})
///////////
reviewsRouter.get("/", async (req, res, next) => {
  try {
    const review = await ReviewsModel.find()
    res.status(200).send(review)
  } catch (error) {
    next(error)
  }
})
///////////
reviewsRouter.get("/:reviewId", async (req, res, next) => {
  try {
    const updatedReview = await ReviewsModel.findByIdAndUpdate(req.params.blogId, { $push: { comments: req.body } }, { new: true })

    res.status(201).send(updatedReview)
  } catch (error) {
    next(error)
  }
})
///////////
reviewsRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const updatedReview = await ReviewsModel.findByIdAndUpdate(req.params.reviewId, req.body, { new: true, runValidators: true })
    res.send(updatedReview)
  } catch (error) {
    next(error)
  }
})
///////////
reviewsRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    await ReviewsModel.findByIdAndDelete(req.params.reviewId)

    res.status(201).send("RIP")
  } catch (error) {
    next(error)
  }
})

export default reviewsRouter
