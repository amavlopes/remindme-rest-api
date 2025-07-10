import { PrismaClient } from '../generated/prisma';

const prisma: PrismaClient = new PrismaClient({
	errorFormat: 'minimal',
});

async function main() {}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});


    