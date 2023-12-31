const { faker } = require("@faker-js/faker");
const { prisma } = require("./client");

async function main() {
  await prisma.transaction.deleteMany({})
  const products =  Array.from(Array(5).keys()).map(i=>faker.commerce.productName())
  const transactions = Array.from(Array(100).keys()).map((i) => ({
    customer_name : faker.person.fullName(),
    product_purchased: faker.helpers.arrayElement(products),
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
