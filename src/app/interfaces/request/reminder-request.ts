export default interface IReminderRequest {
	id?: number
	name: string
	color?: string
	categoryId?: number
	description?: string
	scheduledAt?: string
}
