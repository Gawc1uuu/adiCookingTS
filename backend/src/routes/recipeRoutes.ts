import express, { Router } from "express";
import {
  createRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
  createComment,
  getAllComments,
  deleteComment,
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

// add comment route
router.post("/:id/comments", authMiddleware, createComment);
// get comments route
router.get("/:id/comments", getAllComments);
// delete comment
router.delete("/:id/comments/:commentId", deleteComment);

export default router;
