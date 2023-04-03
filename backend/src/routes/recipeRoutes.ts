import express, { Router } from "express";
import Recipe from "../models/recipeModel";
import { MongooseError } from "mongoose";
import {
  createRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
} from "../controllers/recipeControllers";

const router: Router = express.Router();

//get all recipes
router.get("/", getRecipes);

router.get("/:id", getRecipe);

router.post("/", createRecipe);

router.delete("/:id", deleteRecipe);

router.patch("/:id", updateRecipe);

export default router;
