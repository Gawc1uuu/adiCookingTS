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
    ingredients: {
        type: [String],
        required: true,
    },
    cookingTime: {
        type: Number,
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdBy: {
        username: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
    },
}, { timestamps: true });
const Recipe = (0, mongoose_1.model)("Recipe", recipeSchema);
exports.default = Recipe;
