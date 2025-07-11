import ICategory from './category'

export default interface IReminder {
	id: number
	name: string
	color: string
	category?: ICategory
	description?: string
	scheduledAt?: string
}
