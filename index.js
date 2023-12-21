import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import db from "./config/Database.js";
import ProductRoute from "./routes/ProductRoutes.js";
dotenv.config();

const app = express();

// (async () => {
//   await db.sync();
// })();

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());
app.use(ProductRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server Running...");
});
