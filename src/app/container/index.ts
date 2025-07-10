import { container } from "tsyringe";
import { PrismaClient } from "../../../generated/prisma";

import { prisma } from "../../../prisma";
import CategoryService from "../services/category-service";
import CategoryRepository from "../repositories/category-repository";

container.register<PrismaClient>("PrismaClient", { useValue: prisma });
container.registerSingleton<CategoryService>(
  "CategoryService",
  CategoryService
);
container.registerSingleton<CategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);
