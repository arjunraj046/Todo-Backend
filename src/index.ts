import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todoRoutes";
import dotenv from "dotenv";

import { createConnection } from "typeorm";
import connectionOptions from "./typeorm.config";

createConnection(connectionOptions)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
dotenv.config({ path: "config.env" });

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
