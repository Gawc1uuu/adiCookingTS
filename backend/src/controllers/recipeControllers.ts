import mongoose, { isValidObjectId } from "mongoose";
import express, { Request, Response } from "express";
import cloudinaryInstance from "../utils/cloudinary";
import Recipe from "../models/recipeModel";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

// get all recipes
const getRecipes = async (req: Request, res: Response) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const [recipes, total] = await Promise.all([
    Recipe.find({}).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Recipe.countDocuments(),
  ]);

  // const recipes = await Recipe.find({})
  //   .sort({ createdAt: -1 })
  //   .skip(skip)
  //   .limit(Number(limit));

  res.status(200).json({
    currentPage: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    recipes,
  });
};

//get single recipe
const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Id not valid" });
  }

  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }
  return res.status(200).json(recipe);
};

//create new recipe
const createRecipe = async (req: AuthenticatedRequest, res: Response) => {
  const { title, method, ingredients, cookingTime, image } = req.body;
  const user = req.user;

  try {
    const result = await cloudinaryInstance.uploader.upload(image, {
      folder: "recipes",
      quality: 80,
      width: 500,
      heigth: 500,
    });

    const recipe = await Recipe.create({
      title,
      method,
      ingredients,
      cookingTime,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      createdBy: {
        username: user.username,
        user_id: user._id,
      },
    });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//delete a recipe
const deleteRecipe = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Id not valid" });
  }

  const recipe = await Recipe.findOneAndDelete({ _id: id });
  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }

  // if (recipe.createdBy?.user_id !== _id) {
  //   return res
  //     .status(400)
  //     .json({ error: "Only author can delete his own recipes" });
  // }

  return res.status(200).json(recipe);
};
//edit recipe
const updateRecipe = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Id not valid" });
  }

  const recipe = await Recipe.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }
  return res.status(200).json(recipe);
};

const createComment = async (req: Request, res: Response) => {
  try {
    const { text, rating, createdBy, createdAt, updatedAt } = req.body;
    const { id } = req.params;

    // find the post by ID
    const recipe = await Recipe.findById(id);

    // create new comment
    const comment = { text, rating, createdBy };

    if (!recipe) {
      return res.status(400).json({ error: "Recipe not found" });
    }

    // add new comment to post's comments array
    recipe.comments.push(comment);

    // save updated post to database
    await recipe.save();

    // send success response
    res.status(200).json({ comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  createRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
  createComment,
};
