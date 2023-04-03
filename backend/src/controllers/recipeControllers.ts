import mongoose, { isValidObjectId } from "mongoose";
import express, { Request, Response } from "express";
import Recipe from "../models/recipeModel";

// get all recipes
const getRecipes = async (req: Request, res: Response) => {
  const recipes = await Recipe.find({}).sort({ createdAt: -1 });

  res.status(200).json(recipes);
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
  res.status(200).json(recipe);
};

//create new recipe
const createRecipe = async (req: Request, res: Response) => {
  const { title, method, cookingTime } = req.body;

  try {
    const recipe = await Recipe.create({ title, method, cookingTime });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//delete a recipe
const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Id not valid" });
  }

  const recipe = await Recipe.findOneAndDelete({ _id: id });
  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }
  return res.status(200).json(recipe);
};
//edit recipe
const updateRecipe = async (req: Request, res: Response) => {
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

export { createRecipe, getRecipes, getRecipe, deleteRecipe, updateRecipe  };
