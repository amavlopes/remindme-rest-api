import { inject, injectable } from 'tsyringe'
import { PrismaClient } from '@prisma/client'

import IReminder from '../interfaces/reminder'
import IReminderParams from '../interfaces/reminder-params'
import IReminderRequest from '../interfaces/request/reminder-request'

@injectable()
export default class ReminderRepository {
	constructor(
		@inject('PrismaClient')
		private prismaClient: PrismaClient
	) {}

	async create(reminder: IReminderRequest): Promise<IReminder> {
		this.prismaClient.$connect()

		const resultado = await this.prismaClient.reminder.create({
			data: { ...reminder },
			include: { category: true },
			omit: { categoryId: true },
		})

		this.prismaClient.$disconnect()

		return resultado
	}

	async findAll(params: IReminderParams): Promise<IReminder[]> {
		this.prismaClient.$connect()

		const resultado = await this.prismaClient.reminder.findMany({
			where: {
				...(params.keyword && { name: { contains: params.keyword } }),
				...(params.color && { color: params.color }),
				...(params.categoryId && { categoryId: params.categoryId }),
				...(params.keyword && { description: { contains: params.keyword } }),
			},
			include: { category: true },
			omit: { categoryId: true },
		})

		this.prismaClient.$disconnect()

		return resultado
	}

	async findById(id: number): Promise<IReminder> {
		this.prismaClient.$connect()

		const resultado = await this.prismaClient.reminder.findUnique({
			where: { id },
			include: { category: true },
			omit: { categoryId: true },
		})

		this.prismaClient.$disconnect()

		return resultado
	}

	async update(reminder: IReminderRequest): Promise<IReminder | null> {
		const { id } = reminder

		this.prismaClient.$connect()

		delete reminder.id
		const resultado = await this.prismaClient.reminder.update({
			data: reminder,
			where: { id },
			include: { category: true },
			omit: { categoryId: true },
		})

		this.prismaClient.$disconnect()

		return resultado
	}

	async deleteAll(): Promise<void> {
		this.prismaClient.$connect()

		await this.prismaClient.reminder.deleteMany()

		this.prismaClient.$disconnect()
	}

	async deleteAllByIds(ids: number[]): Promise<void> {
		this.prismaClient.$connect()

		await this.prismaClient.reminder.deleteMany({
			where: {
				id: { in: ids },
			},
		})

		this.prismaClient.$disconnect()
	}

	async deleteById(id: number): Promise<void> {
		this.prismaClient.$connect()

		await this.prismaClient.reminder.delete({
			where: { id },
		})

		this.prismaClient.$disconnect()
	}
}
