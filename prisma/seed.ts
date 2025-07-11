import { prisma } from '.'

async function main() {
	await populateCategories()
	await populateReminders()
}

async function populateCategories() {
	try {
		const categories = [{ name: 'Alimentação' }, { name: 'Saúde' }, { name: 'Lazer' }, { name: 'Trabalho' }]

		const resultado = await prisma.category.createMany({
			data: categories,
		})

		console.log('Categories: ', resultado)
	} catch (error) {
		console.error('Error on create categories: ', error)
	} finally {
		await prisma.$disconnect()
	}
}

async function populateReminders() {
	try {
		const reminders = [
			{
				id: 1,
				name: 'Ir ao supermercado',
				color: '#E1F5C4',
				description: 'Comprar pão, ovos e leite',
				scheduledAt: '2025-07-11T11:00:00.000Z',
				categoryId: 1,
			},
			{
				id: 2,
				name: 'Consulta ao Ortopedista',
				color: '#FAD3B2',
				description: 'Às 14h com Dr Marcos Menezes no Hospital Unimed Recife. Chegar com 30 min de antecedência',
				scheduledAt: '2025-07-11T12:30:00.000Z',
				categoryId: 2,
			},
		]

		const resultado = await prisma.reminder.createMany({
			data: reminders,
		})

		console.log('Reminders: ', resultado)
	} catch (error) {
		console.error('Error on create reminders: ', error)
	} finally {
		await prisma.$disconnect()
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
