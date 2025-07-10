import { container } from "tsyringe";
import { Request, Response } from "express";

import { HttpStatusEnum } from "../enums/http-status.enum";
import ErrorResponse from "../models/error-response";

import CategoryService from "../services/category-service";

export default class CategoryController {
  private service!: CategoryService;

  constructor() {
    this.service = container.resolve(CategoryService);
  }

  async create(request: Request, response: Response) {
    const name = request.body.name as string;

    try {
      const category = await this.service.create({ name });

      return response.status(HttpStatusEnum.CREATED).json(category);
    } catch (e: any) {
      throw new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e);
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    const name = request.query.name as string;

    const categories = await this.service.findAll(name);

    return response.status(HttpStatusEnum.OK).json({ categories });
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const category = await this.service.findById(+category_id);

    if (!category) return response.status(HttpStatusEnum.NOT_FOUND).send();

    return response.status(HttpStatusEnum.OK).json({ category });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;

    const id = +category_id;
    const name = request.body.name as string;

    try {
      const category = await this.service.update({ id, name });

      if (!category) return response.status(HttpStatusEnum.NOT_FOUND).send();

      return response.status(HttpStatusEnum.OK).json({ category });
    } catch (e: any) {
      throw new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e);
    }
  }

  async deleteAll(request: Request, response: Response): Promise<Response> {
    const { ids } = request.query;
    const arrayIds: number[] = (ids as string)?.split(",").map((id) => +id);

    await this.service.deleteAll(arrayIds);

    return response.status(HttpStatusEnum.NO_CONTENT).send();
  }

  async deleteById(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;

    await this.service.deleteById(+category_id);

    return response.status(HttpStatusEnum.NO_CONTENT).send();
  }
}
