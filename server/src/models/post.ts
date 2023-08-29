import { Schema, InferSchemaType, model, isValidObjectId } from "mongoose";
import ServerError from "../utils/ServerError";

const postSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    markdown: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    tags: [{ type: String, required: true }],
    votes: [{ type: Schema.Types.ObjectId, ref: "users" }],
    comments: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true},
        userId: { type: Schema.Types.ObjectId, ref: "users" },
        comment: String,
      },
    ],
    image: String,
    summary: String,
    savedBy: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

postSchema.pre("findOne", function() {
  if(!isValidObjectId(this.getQuery()._id)) throw new ServerError(400, "No such post found!");
})

type userSchemaInferType = InferSchemaType<typeof postSchema>;
export default model<userSchemaInferType>("posts", postSchema);
