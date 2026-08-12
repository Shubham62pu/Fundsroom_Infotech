import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  const users = [
    { name: 'Admin User', email: 'admin@erp.local', password, role: Role.ADMIN },
    { name: 'Sales User', email: 'sales@erp.local', password, role: Role.SALES },
    { name: 'Warehouse User', email: 'warehouse@erp.local', password, role: Role.WAREHOUSE },
    { name: 'Accounts User', email: 'accounts@erp.local', password, role: Role.ACCOUNTS },
  ];

  console.log('Seeding users...');
  for (const user of users) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    console.log(`Created/Updated user: ${createdUser.email} with role ${createdUser.role} (password: password123)`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
