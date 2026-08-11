import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  const users = [
    { name: 'Admin User', email: 'admin@fundsroom.com', password: 'Admin@123', role: Role.ADMIN },
    { name: 'Sales User', email: 'sales@fundsroom.com', password: 'Sales@123', role: Role.SALES },
    { name: 'Warehouse User', email: 'warehouse@fundsroom.com', password: 'Warehouse@123', role: Role.WAREHOUSE },
    { name: 'Accounts User', email: 'accounts@fundsroom.com', password: 'Accounts@123', role: Role.ACCOUNTS },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      },
    });
    console.log(`Seeded user: ${user.email} (${user.role})`);
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
