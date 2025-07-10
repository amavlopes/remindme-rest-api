import { PrismaClient } from '../generated/prisma';

const prisma: PrismaClient = new PrismaClient({
	errorFormat: 'minimal',
});

async function main() {
  await prisma.reminder.create({
	data: {
		name: "Ir ao supermercado",
		category: {
			create: {
				name: "Alimentação"
			}
		},
		description: "Ir antes das 14h no Extra unidade Derby e comprar legumes e frutas."
	}
  })

  const reminders = await prisma.reminder.findMany();

  console.log(reminders)
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});


    