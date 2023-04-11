import mongoose, { Schema, model } from "mongoose";

interface IComment {
  text: string;
  rating: number;
  createdBy: {
    username: string;
    user_id: string;
  };
}

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    createdBy: {
      username: {
        type: String,
        required: true,
      },
      user_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    cookingTime: {
      type: Number,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    createdBy: {
      username: {
        type: String,
        required: true,
      },
      user_id: {
        type: String,
        required: true,
      },
    },
    comments: { type: [CommentSchema], default: [] },
  },
  { timestamps: true }
);

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
