import express from "express";
import createError from "http-errors";
import usermodel from "./model.js";
// =====================================
const userRouter = express.Router();
// =====================================
userRouter.post("/", async (req, res, next) => {
  try {
    const user = await usermodel(req.body);
    const { _id } = await user.save();
    res.send({ _id });
  } catch (error) {
    next(createError(404, "Product page not found!"));
  }
});
// =====================================
userRouter.get("/", async (req, res, next) => {
  try {
    const getUser = await usermodel.find();

    res.send(getUser);
  } catch (error) {
    next(createError(404, "Product page not found!"));
  }
});
// =====================================
userRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await usermodel.findById(req.params.userId);
    res.send(user);
  } catch (error) {
    next(createError(404, `Product with ${req.params.userId} not found!`));
  }
});
// =====================================
userRouter.put("/:userId", async (req, res, next) => {
  try {
    const modify = await usermodel(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(modify);
  } catch (error) {
    next(createError(404, `Product with Id${req.params.userId} not found!`));
  }
});
// =====================================
userRouter.delete("/:userId", async (req, res, next) => {
  try {
    const deleteUser = await usermodel.findByIdAndDelete(req.params.userId);
    res.send(deleteUser);
  } catch (error) {
    next(createError(404, `Product with Id${req.params.userId} not found!`));
  }
});

// =====================================
export default userRouter;
