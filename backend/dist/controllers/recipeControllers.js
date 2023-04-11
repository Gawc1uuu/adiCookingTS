"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.updateRecipe = exports.deleteRecipe = exports.getRecipe = exports.getRecipes = exports.createRecipe = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const recipeModel_1 = __importDefault(require("../models/recipeModel"));
// get all recipes
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 6 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const [recipes, total] = yield Promise.all([
        recipeModel_1.default.find({}).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        recipeModel_1.default.countDocuments(),
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
});
exports.getRecipes = getRecipes;
//get single recipe
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Id not valid" });
    }
    const recipe = yield recipeModel_1.default.findById(id);
    if (!recipe) {
        return res.status(404).json({ error: "No such recipe" });
    }
    return res.status(200).json(recipe);
});
exports.getRecipe = getRecipe;
//create new recipe
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, method, ingredients, cookingTime, image } = req.body;
    const user = req.user;
    try {
        const result = yield cloudinary_1.default.uploader.upload(image, {
            folder: "recipes",
            quality: 80,
            width: 500,
            heigth: 500,
        });
        const recipe = yield recipeModel_1.default.create({
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
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.createRecipe = createRecipe;
//delete a recipe
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Id not valid" });
    }
    const recipe = yield recipeModel_1.default.findOneAndDelete({ _id: id });
    if (!recipe) {
        return res.status(404).json({ error: "No such recipe" });
    }
    // if (recipe.createdBy?.user_id !== _id) {
    //   return res
    //     .status(400)
    //     .json({ error: "Only author can delete his own recipes" });
    // }
    return res.status(200).json(recipe);
});
exports.deleteRecipe = deleteRecipe;
//edit recipe
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Id not valid" });
    }
    const recipe = yield recipeModel_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!recipe) {
        return res.status(404).json({ error: "No such recipe" });
    }
    return res.status(200).json(recipe);
});
exports.updateRecipe = updateRecipe;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, rating, createdBy, createdAt, updatedAt } = req.body;
        const { id } = req.params;
        // find the post by ID
        const recipe = yield recipeModel_1.default.findById(id);
        // create new comment
        const comment = { text, rating, createdBy };
        if (!recipe) {
            return res.status(400).json({ error: "Recipe not found" });
        }
        // add new comment to post's comments array
        recipe.comments.push(comment);
        // save updated post to database
        yield recipe.save();
        // send success response
        res.status(200).json({ comment });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createComment = createComment;
