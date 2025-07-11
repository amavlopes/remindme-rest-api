import swaggerAutogen from 'swagger-autogen'

const swaggerConfig = {
	openapi: '3.0.0',
	info: {
		title: 'RemindMe API',
		version: '1.0.0',
		description: '',
	},
	servers: [
		{
			url: 'http://localhost:7000',
		},
	],
	components: {
		schemas: {
			CategoryRequest: {
				$name: 'Alimentação',
			},
			CategoryResponse: {
				id: 1,
				name: 'Alimentação',
			},
			CategoryListResponse: [
				{
					id: 1,
					name: 'Alimentação',
				},
			],
			ReminderRequest: {
				$name: 'Ir ao supermercado',
				color: '#E1F5C4',
				categoryId: 1,
				description: 'Comprar pão, ovos e leite',
				scheduledAt: '2025-07-11T11:00:00.000Z',
			},
			ReminderResponse: {
				id: 1,
				name: 'Ir ao supermercado',
				color: '#E1F5C4',
				category: {
					id: 1,
					name: 'Alimentação',
				},
				description: 'Comprar pão, ovos e leite',
				scheduledAt: '2025-07-11T11:00:00.000Z',
			},
			ReminderListResponse: [
				{
					id: 1,
					name: 'Ir ao supermercado',
					color: '#E1F5C4',
					category: {
						id: 1,
						name: 'Alimentação',
					},
					description: 'Comprar pão, ovos e leite',
					scheduledAt: '2025-07-11T11:00:00.000Z',
				},
			],
			Error: {
				status: 400,
				message: '\nInvalid `prisma.course.create()` invocation:\n\n\nUnique constraint failed on the constraint: `courses_name_key`',
				details: {
					code: 'P2002',
					meta: {
						modelName: 'Category',
						target: 'categories_name_key',
					},
					clientVersion: '6.7.0',
					name: 'PrismaClientKnownRequestError',
				},
			},
		},
	},
}

const outputFile = './swagger-output.json'
const routes = ['./src/index.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, swaggerConfig).then(async () => {
	await import('./src/index')
})
