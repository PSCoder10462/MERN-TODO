import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Pusher from "pusher";
import Todo from "./models/todoModel.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// configure pusher
const pusher = new Pusher({
  appId: "1154213",
  key: "15057156b578c5f6fdc7",
  secret: "223b6842de6cef22747d",
  cluster: "ap2",
  useTLS: true,
});

// configure db
const db = mongoose.connection;
const CONNECTION_URL = process.env.DB_LINK;
const DEPRECATED_FIX = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

db.on("error", (error) => console.log("❌ MongoDB:", error)); // listen for errors after the connection is established (errors during the session)
db.on("disconnected", () => console.log("❌ MongoDB disconnected"));

db.once("open", () => {
  console.log("✅ MongoDB connected");
  const todoCollection = db.collection("todos");
  const changeStream = todoCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const todoDetails = change.fullDocument;

      pusher
        .trigger("todos", "inserted", {
          todoDetails,
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("Error Triggering Pusher");
    }
  });
});

// connect to db
mongoose
  .connect(CONNECTION_URL, DEPRECATED_FIX)
  .catch((error) => console.log("❌ MongoDB:", error)); // listen for errors on initial connection

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
