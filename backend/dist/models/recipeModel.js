"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const Recipe = (0, mongoose_1.model)("Recipe", recipeSchema);
exports.default = Recipe;
