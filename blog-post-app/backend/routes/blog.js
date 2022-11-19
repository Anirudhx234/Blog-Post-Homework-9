import express from "express";

import { BlogModel } from "../schema/blog.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  // find blogs based on no condition==> get all blogs
  const blogs = await BlogModel.find({});
  // convert each blog to an object and send an array to client
  return res.send(blogs.map((blog) => blog.toObject()));
});

router.post("/create-post", async (req, res) => {
  const body = req.body;

  const blog = new BlogModel({ content: body.content, title: body.title });

  if (req.body.password !== process.env.PASSWORD) {
    return res.status(400).send("Incorrect Password");
  } else await blog.save();

  return res.send(blog.toObject());
});

router.delete("/delete-post", async (req, res) => {
  const body = req.body;
  BlogModel.find({title: body.title}).deleteOne().exec();
});

export default router;
