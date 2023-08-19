const { faker } = require("@faker-js/faker");
const { prisma } = require("./client");

async function main() {
  const transactions = Array.from(Array(15).keys()).map((i) => ({
    product_purchased: faker.commerce.productName(),
    quantity: faker.number.int({ max: 10 }),
    sales: faker.number.float({ max: 100 }),
    month_year: faker.date.past({ years: 10 }),
  }));
  const res = await prisma.transaction.createMany({
    data: transactions,
    skipDuplicates: true,
  });
  console.log(`Successfully created ${res.count} entries`)
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
