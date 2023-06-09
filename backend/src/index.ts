import express, { Request, Response } from "express";
const app = express();
import mongoose, { MongooseError } from "mongoose";
import recipeRoutes from "./routes/recipeRoutes";
import userRoutes from "./routes/userRoutes";
import { Server } from "socket.io";

import cors from "cors";

// for socket io
import http from "http";

//middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/user", userRoutes);

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({ msg: "Not found" });
});

// socket io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://adicooking.onrender.com",
    methods: ["GET", "POST"],
  },
});

// connecting to db
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI?.toString() ?? "")
  .then(() =>
    server.listen(4000, () => {
      console.log("Conntected to database and listening on port 4000");
    })
  )
  .catch((e) => {
    console.log((e as MongooseError).message);
  });

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("addComment", (data) => {
    socket.emit("newComment", data);
  });

  socket.on("deleteComment", (data) => {
    socket.emit("deletedComment", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});
