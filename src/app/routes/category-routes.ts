import express, { Request, Response } from "express";

import CategoryController from "../controllers/category-controller";

const routes = express.Router();
const controller = new CategoryController();

routes.post("/", (req: Request, res: Response) => {
  controller.create(req, res);
});

routes.get("/", (req: Request, res: Response) => {
  controller.findAll(req, res);
});

routes.get("/:category_id", (req: Request, res: Response) => {
  controller.findById(req, res);
});

routes.put("/:category_id", (req: Request, res: Response) => {
  controller.update(req, res);
});

routes.delete("/", (req: Request, res: Response) => {
  controller.deleteAll(req, res);
});

routes.delete("/:category_id", (req: Request, res: Response) => {
  controller.deleteById(req, res);
});

export default routes;
