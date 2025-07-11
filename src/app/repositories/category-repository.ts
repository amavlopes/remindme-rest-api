import { injectable, inject } from 'tsyringe'
import { PrismaClient } from '@prisma/client'

import ICategory from '../interfaces/category'

@injectable()
export default class CategoryRepository {
	constructor(
		@inject('PrismaClient')
		private prismaClient: PrismaClient
	) {}

	async create(category: ICategory): Promise<ICategory> {
		this.prismaClient.$connect()

		const resultado = await this.prismaClient.category.create({
			data: { ...category },
		})

		this.prismaClient.$disconnect()

		return resultado
	}

	async findAll(name: string): Promise<ICategory[]> {
		this.prismaClient.$connect()

		const resultado = await this.prismaClient.category.findMany({
			where: {
				...(name && { name: { contains: name } }),
			},
		})

		this.prismaClient.$disconnect()

		return resultado
	}

	async findById(id: number): Promise<ICategory> {
		this.prismaClient.$connect()

		const resultado = await this.prismaClient.category.findUnique({
			where: { id },
		})

		this.prismaClient.$disconnect()

		return resultado
	}

	async update(category: ICategory): Promise<ICategory | null> {
		const { id } = category

		this.prismaClient.$connect()

		delete category.id
		const resultado = await this.prismaClient.category.update({
			data: category,
			where: { id },
		})

		this.prismaClient.$disconnect()

		return resultado
	}

	async deleteAll(): Promise<void> {
		this.prismaClient.$connect()

		await this.prismaClient.category.deleteMany()

		this.prismaClient.$disconnect()
	}

	async deleteAllByIds(ids: number[]): Promise<void> {
		this.prismaClient.$connect()

		await this.prismaClient.category.deleteMany({
			where: {
				id: { in: ids },
			},
		})

		this.prismaClient.$disconnect()
	}

	async deleteById(id: number): Promise<void> {
		this.prismaClient.$connect()

		await this.prismaClient.category.delete({
			where: { id },
		})

		this.prismaClient.$disconnect()
	}
}
