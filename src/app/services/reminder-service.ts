import { inject, injectable } from 'tsyringe'

import IReminder from '../interfaces/reminder'
import IReminderParams from '../interfaces/reminder-params'
import IReminderRequest from '../interfaces/request/reminder-request'
import ReminderRepository from '../repositories/reminder-repository'

@injectable()
export default class ReminderService {
	constructor(
		@inject('ReminderRepository')
		private repository: ReminderRepository
	) {}

	async create(reminder: IReminderRequest): Promise<IReminder> {
		return await this.repository.create(reminder)
	}

	async findAll(params: IReminderParams): Promise<IReminder[]> {
		return await this.repository.findAll(params)
	}

	async findById(id: number): Promise<IReminder> {
		return await this.repository.findById(+id)
	}

	async update(reminder: IReminderRequest): Promise<IReminder | null> {
		return await this.repository.update(reminder)
	}

	async deleteAll(ids?: number[]): Promise<void> {
		if (!ids?.length) await this.repository.deleteAll()
		else await this.repository.deleteAllByIds(ids)
	}

	async deleteById(id: number): Promise<void> {
		await this.repository.deleteById(id)
	}
}
