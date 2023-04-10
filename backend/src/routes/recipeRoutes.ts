import express, { Router } from "express";
import {
  createRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
} from "../controllers/recipeControllers";
import authMiddleware from "../middleware/requireAuth";

const router: Router = express.Router();

// middleware

//get all recipes
router.get("/", getRecipes);

router.get("/:id", getRecipe);

router.post("/", authMiddleware, createRecipe);

router.delete("/:id", authMiddleware, deleteRecipe);

router.patch("/:id", authMiddleware, updateRecipe);

export default router;
