import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
// import Pusher from "pusher";
import http from "http";
import Todo from "./models/todoModel.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// configure Socket.io

const server = http.createServer(app),
  io = new Server(server, { pingTimeout: 50000 });

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", (data) => {
    console.log(data);
    console.log("Client disconnected");
  });
});

// configure db
const db = mongoose.connection;
const CONNECTION_URL = process.env.DB_LINK;
const DEPRECATED_FIX = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

db.on("error", (error) => console.log("❌ MongoDB:", error)); // listen for errors after the connection is established (errors during the session)
db.on("disconnected", () => console.log("❌ MongoDB disconnected"));

db.once("open", () => {
  console.log("✅ MongoDB connected");
  const todoCollection = db.collection("todos");
  const changeStream = todoCollection.watch({ fullDocument: "updateLookup" });
  changeStream.on("change", (change) => {
    // const todoDetails = change.fullDocument;
    (change.operationType === "insert" ||
      change.operationType === "update" ||
      change.operationType === "delete") &&
      io.emit("dbUpdate", "DB UPDATED");
  });
});

// connect to db
mongoose
  .connect(CONNECTION_URL, DEPRECATED_FIX)
  .catch((error) => console.log("❌ MongoDB:", error)); // listen for errors on initial connection

app.get("/todos/", async (req, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

app.post("/todos", (req, res) => {
  Todo.create(req.body.todo, (err, doc) => {
    if (err) {
      res.send(err).status(404);
    } else {
      res.send("Todo Added successfully !!");
    }
  });
});

app.put("/todos", (req, res) => {
  Todo.findByIdAndUpdate(
    req.body.todo._id,
    { check: !req.body.todo.check },
    (err) => {
      if (err) {
        res.send(err).status(404);
      } else {
        res.send("Todo Updated successfully !!");
      }
    }
  );
});

app.delete("/todos", (req, res) => {
  Todo.findByIdAndDelete(req.body._id, (err) => {
    if (err) {
      res.send(err).status(404);
    } else {
      res.send("Todo Deleted successfully !!");
    }
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Started on 5000");
});
