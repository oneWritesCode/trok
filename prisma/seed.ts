import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  connectionTimeoutMillis: 60000,
});

const prisma = new PrismaClient({ adapter });

const stocks = [
  {
    name: "deepak",
    description: "dev-ta",
    currentPrice: 150,
    volatility: 0.018,
  },
  {
    name: "sam rande",
    description: "hacker",
    currentPrice: 220,
    volatility: 0.025,
  },
  { name: "nihit", description: "dev", currentPrice: 85, volatility: 0.022 },
  {
    name: "neeraj",
    description: "Techy",
    currentPrice: 669,
    volatility: 0.024,
  },
  {
    name: "client",
    description: "xhutiya",
    currentPrice: 69,
    volatility: 0.027,
  },
  {
    name: "yash",
    description: "founder",
    currentPrice: 111,
    volatility: 0.032,
  },
];

async function main() {
  for (const stock of stocks) {
    await prisma.stock.upsert({
      where: { name: stock.name },
      update: {
        description: stock.description,
        currentPrice: stock.currentPrice,
        volatility: stock.volatility,
      },
      create: stock,
    });
  }

  console.log("Seeding done");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
