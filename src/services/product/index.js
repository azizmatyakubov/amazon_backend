import express from "express"
import createError from "http-errors"
import productmodel from "./model.js"
// =====================================
const productRouter = express.Router()
// =====================================
productRouter.post("/", async (req, res, next) => {
  try {
    const product = await productmodel(req.body)
    const { _id } = await product.save()
    res.send({ _id })
  } catch (error) {
    next(createError(404, "Product page not found!"))
  }
})
// =====================================
productRouter.get("/", async (req, res, next) => {
  try {
    const getproduct = await productmodel.find().populate({ path: "reviews", select: "_id comment rate" })

    res.send(getproduct)
  } catch (error) {
    next(createError(404, "Product page not found!"))
  }
})
// =====================================
productRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await productmodel.findById(req.params.productId)

    res.send(product)
  } catch (error) {
    next(createError(404, `Product with ${req.params.productId} not found!`))
  }
})
// =====================================
productRouter.put("/:productId", async (req, res, next) => {
  try {
    const modify = await productmodel.findByIdAndUpdate(req.params.productId, req.body, {
      new: true,
      runValidators: true,
    })
    res.send()
  } catch (error) {
    next(createError(404, `Product with Id${req.params.productId} not found!`))
  }
})
// =====================================
productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const delet = await productmodel.findByIdAndDelete(req.params.productId)
    res.send()
  } catch (error) {
    next(createError(404, `Product with Id${req.params.productId} not found!`))
  }
})


productRouter.post('/:productId/reviews', async(req, res, next) => {
  try {
    const newReview = {...req.body, date: new Date()}
    console.log(newReview)
    const updatedProduct = await productmodel.findByIdAndUpdate(req.params.productId, {$push: {reviews: newReview}}, {new: true, runValidators: true})
    if(updatedProduct) {
      res.status(200).send(updatedProduct)
    } else {
      next(createError(404, `Product with id ${req.params.productId} not found`))
    }
  } catch (error) {
    next(error)
  }
})

productRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
   

    // const product = await productmodel.findById(req.params.productId).populate({ path: "reviews", select: "_id comment rate " })
    // if (product) {
    //   res.send(product.reviews)
    // } else {
    //   next(createError(404, `Product with Id${req.params.productId} not found!`))
    // }
  } catch (error) {
    next(createError(404, `Product with Id${req.params.productId} not found!`))
  }
})
// =====================================
export default productRouter

// 626bd86639772a270c0f5d2a
