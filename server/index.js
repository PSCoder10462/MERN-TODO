import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Todo from "./models/todoModel.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose.connect(process.env.DB_LINK, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.set("useCreateIndex", true);

app.get("/getTodo", async (req, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

app.post("/addTodo", (req, res) => {
  Todo.create(req.body.todo);
  res.send("Todo Added Successfully!!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Started on 5000");
});
