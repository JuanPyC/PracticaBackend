import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Seed Admin User
  const adminEmail = 'admin@test.com';
  const adminPassword = '123456';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrator'
      }
    });
    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️ Admin user already exists');
  }

  // 2. Seed Properties in Medellín
  const properties = [
    {
      title: 'Apartamento de Lujo en El Poblado',
      price: 450000000,
      location: 'El Poblado, Medellín',
      available: true
    },
    {
      title: 'Casa Tradicional en Laureles',
      price: 380000000,
      location: 'Laureles, Medellín',
      available: true
    },
    {
      title: 'Moderno Loft en Envigado',
      price: 290000000,
      location: 'Envigado, Antioquia',
      available: true
    },
    {
      title: 'Apartamento Familiar en Belén',
      price: 210000000,
      location: 'Belén, Medellín',
      available: false
    },
    {
      title: 'Penthouse con Vista en Sabaneta',
      price: 520000000,
      location: 'Sabaneta, Antioquia',
      available: true
    }
  ];

  console.log('🌱 Seeding properties...');
  
  for (const property of properties) {
    // Check if property with same title exists to avoid duplicates
    const existing = await prisma.property.findFirst({
      where: { title: property.title }
    });

    if (!existing) {
      await prisma.property.create({
        data: property
      });
      console.log(`+ Created: ${property.title}`);
    }
  }

  console.log('✅ Property seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
