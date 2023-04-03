"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes"));
// connecting to db
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/recipes")
    .then(() => app.listen(4000, () => {
    console.log("Conntected to database and listening on port 4000");
}))
    .catch((e) => {
    console.log(e.message);
});
//middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//routes
app.use("/api/recipes", recipeRoutes_1.default);
