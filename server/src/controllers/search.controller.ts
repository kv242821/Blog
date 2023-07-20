import asyncHandler from "express-async-handler";
import Post from "../models/post";
import Tag from "../models/tag";
import User from "../models/user";
import { getPostsWithUser } from "./post.controller";

export const postSearch = asyncHandler(async (req, res, nnext) => {
  const { query } = req.params;
  const regex = new RegExp(`${query}`, "i");
  const posts = await getPostsWithUser(
    Post.find({
      $and: [
        { title: regex },
      ],
    })
  );
  res.send(posts);
});

export const topicSearch = asyncHandler(async (req, res, next) => {
  const { query } = req.params;
  const regex = new RegExp(`${query}`, "i");
  const tags = await Tag.find({ name: regex });
  res.send(tags);
});

export const userSearch = asyncHandler(async (req, res, next) => {
  const { query } = req.params;
  const regex = new RegExp(`${query}`, "i");
  const users = await User.find({ name: regex });
  res.send(users);
});
