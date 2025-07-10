import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { serve, setup } from "swagger-ui-express";

import swaggerFile from "../swagger-output.json";

import "./app/container";
import categoryRoutes from "./app/routes/category-routes";

const app = express();

app.use(cors({ origin: process.env.ENABLED_CORS?.split(",") || [] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use("/categories", categoryRoutes);

app.use("/docs", serve, setup(swaggerFile));

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.APP_PORT}`);
});
