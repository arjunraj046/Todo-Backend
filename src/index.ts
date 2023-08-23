import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todoRoutes";
import dotenv from "dotenv";

dotenv.config({ path: "config.env" });

import { createConnection } from "typeorm";
import connectionOptions from "./typeorm.config";

createConnection(connectionOptions)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// const { Client } = require("pg");
// const dbConfig = {
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   // username: "postgres",
//   password: "sanika",
//   port: 5432,
// };
// const client = new Client(dbConfig);
// client
//   .connect()
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((e: any) => {
//     console.log("Error:", e);
//   });

// async function main() {
//   const connection = await createConnection();
//   console.log(connection, "something connected");

//   // Your application logic here
// }
// main().catch((error) => console.error(error));

// const wwc = Connection.getRepository(Todo);

// createConnection({
//   type: "postgres",
//   host: "postgresql.cweibzdpd9si.ap-south-1.rds.amazonaws.com",
//   port: 5432,
//   username: "postgres",
//   password: "sanika123",
//   database: "sampleDB",
// })
//   .then(() => {
//     console.log("database connected successfully");
//   })
//   .catch((e) => {
//     console.log("Error :", e);
//   });

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
