import express, { Express, Request, Response } from "express";
import mongoose, { MongooseError } from "mongoose";
import recipeRoutes from "./routes/recipeRoutes";
import cors from "cors";
const app = express();

// connecting to db
mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/recipes")
  .then(() =>
    app.listen(4000, () => {
      console.log("Conntected to database and listening on port 4000");
    })
  )
  .catch((e) => {
    console.log((e as MongooseError).message);
  });

//middleware

app.use(express.json());
app.use(cors());

//routes
app.use("/api/recipes", recipeRoutes);
app.get("*", (req: Request, res: Response) => {
  res.status(404).json({ msg: "Not found" });
});
