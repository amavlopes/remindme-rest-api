import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";

import "./app/container";
import categoryRoutes from "./app/routes/category-routes";

const app = express();

app.use(cors({ origin: process.env.ENABLED_CORS?.split(",") || [] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/categories", categoryRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.APP_PORT}`);
});
