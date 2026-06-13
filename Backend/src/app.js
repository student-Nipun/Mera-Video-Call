import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connect } from "node:http2";
import { connectToSocket } from "./controllers/socketManagers.js";

import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.get("/home", (req, res) => {
  return res.json({ hello: "World" });
});

const start = async () => {
  const connectingDB = await mongoose.connect(
    "mongodb+srv://nipungoyal83909_db_user:ApnaVideo@cluster0.ybcmcj6.mongodb.net/",
  );
  console.log(`Mongo Connected DB Host: ${connectingDB.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log(`App is listening on port 8000`);
  });
};

start();
