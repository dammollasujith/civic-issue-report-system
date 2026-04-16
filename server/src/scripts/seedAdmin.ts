import { hashPassword } from "../services/passwords.js";
import { prisma } from "../config/prisma.js";

const email = process.env.SEED_ADMIN_EMAIL || "admin@city.gov";
const password = process.env.SEED_ADMIN_PASSWORD || "Admin@12345";
const name = process.env.SEED_ADMIN_NAME || "City Admin";

await prisma.$connect();

const existing = await prisma.user.findUnique({ where: { email } });
if (existing) {
  // eslint-disable-next-line no-console
  console.log("Admin already exists:", existing.email);
  process.exit(0);
}

const user = await prisma.user.create({
  data: {
    name,
    email,
    role: "admin",
    passwordHash: await hashPassword(password)
  }
});

// eslint-disable-next-line no-console
console.log("Seeded admin:", { email: user.email, password });

process.exit(0);

