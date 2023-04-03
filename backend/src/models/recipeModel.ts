import mongoose, { Schema, model } from "mongoose";

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
    cookingTime: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
