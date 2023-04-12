"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipeControllers_1 = require("../controllers/recipeControllers");
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const router = express_1.default.Router();
// middleware
//get all recipes
router.get("/", recipeControllers_1.getRecipes);
router.get("/:id", recipeControllers_1.getRecipe);
router.post("/", requireAuth_1.default, recipeControllers_1.createRecipe);
router.delete("/:id", requireAuth_1.default, recipeControllers_1.deleteRecipe);
router.patch("/:id", requireAuth_1.default, recipeControllers_1.updateRecipe);
// add comment route
router.post("/:id/comments", requireAuth_1.default, recipeControllers_1.createComment);
// get comments route
router.get("/:id/comments", recipeControllers_1.getAllComments);
// delete comment
router.delete("/:id/comments/:commentId", recipeControllers_1.deleteComment);
exports.default = router;
