import { prisma } from ".";

async function main() {
  await populateCategories();
}

async function populateCategories() {
  try {
    const categories = [
      { name: "Alimentação" },
      { name: "Saúde" },
      { name: "Lazer" },
      { name: "Trabalho" },
    ];

    const resultado = await prisma.category.createMany({
      data: categories,
    });

    console.log("Categorias: ", resultado);
  } catch (error) {
    console.error("Erro ao cadastrar categorias: ", error);
  } finally {
    await prisma.$disconnect();
  }
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
