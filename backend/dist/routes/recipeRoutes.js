"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipeControllers_1 = require("../controllers/recipeControllers");
const router = express_1.default.Router();
//get all recipes
router.get("/", recipeControllers_1.getRecipes);
router.get("/:id", recipeControllers_1.getRecipe);
router.post("/", recipeControllers_1.createRecipe);
router.delete("/:id", recipeControllers_1.deleteRecipe);
router.patch("/:id", recipeControllers_1.updateRecipe);
exports.default = router;
