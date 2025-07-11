import { container } from 'tsyringe'
import { PrismaClient } from '../../../generated/prisma'

import { prisma } from '../../../prisma'
import CategoryService from '../services/category-service'
import CategoryRepository from '../repositories/category-repository'
import ReminderService from '../services/reminder-service'
import ReminderRepository from '../repositories/reminder-repository'

container.register<PrismaClient>('PrismaClient', { useValue: prisma })
container.registerSingleton<CategoryService>('CategoryService', CategoryService)
container.registerSingleton<CategoryRepository>('CategoryRepository', CategoryRepository)
container.registerSingleton<ReminderService>('ReminderService', ReminderService)
container.registerSingleton<ReminderRepository>('ReminderRepository', ReminderRepository)
