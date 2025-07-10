import { inject, injectable } from "tsyringe";

import ICategory from "../interfaces/category";
import CategoryRepository from "../repositories/category-repository";
@injectable()
export default class CategoryService {
  constructor(
    @inject("CategoryRepository")
    private repository: CategoryRepository
  ) {}

  async create(category: ICategory): Promise<ICategory> {
    return await this.repository.create(category);
  }

  async findAll(name: string): Promise<ICategory[]> {
    return await this.repository.findAll(name);
  }

  async findById(id: number): Promise<ICategory> {
    return await this.repository.findById(+id);
  }

  async update(category: ICategory): Promise<ICategory | null> {
    return await this.repository.update(category);
  }

  async deleteAll(ids?: number[]): Promise<void> {
    if (!ids?.length) await this.repository.deleteAll();
    else await this.repository.deleteAllByIds(ids);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.deleteById(id);
  }
}
