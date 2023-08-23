"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "config.env" });
const typeorm_1 = require("typeorm");
const typeorm_config_1 = __importDefault(require("./typeorm.config"));
(0, typeorm_1.createConnection)(typeorm_config_1.default)
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
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/", todoRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
