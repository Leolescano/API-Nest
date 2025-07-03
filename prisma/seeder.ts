// Importa el cliente Prisma generado automáticamente
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Instancia del cliente Prisma
const prisma = new PrismaClient();

// Función principal para poblar la base de datos
async function main() {
  // Hashea las contraseñas antes de crear los usuarios
  const hashedPassword1 = await bcrypt.hash('654321', 10);
  const hashedPassword2 = await bcrypt.hash('123456', 10);
  const hashedPassword3 = await bcrypt.hash('abcdef', 10);
  const hashedPassword4 = await bcrypt.hash('qwerty', 10);
  const hashedPassword5 = await bcrypt.hash('zxcvbn', 10);

  // Crea algunos usuarios con contraseña hasheada
  const user1 = await prisma.user.create({
    data: {
      email: 'pedrodesarrollador@gmail.com',
      firstName: 'Pedro',
      lastName: 'Martinez',
      password: hashedPassword1,
      role: 'USER',
      telephone: '47997635497',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'leolescanomdq@gmail.com',
      firstName: 'Leonardo',
      lastName: 'Lescano',
      password: hashedPassword2,
      role: 'USER',
      telephone: '47997635498',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'maria.silva@gmail.com',
      firstName: 'Maria',
      lastName: 'Silva',
      password: hashedPassword3,
      role: 'USER',
      telephone: '47997635499',
    },
  });

  const user4 = await prisma.user.create({
    data: {
      email: 'joao.souza@gmail.com',
      firstName: 'João',
      lastName: 'Souza',
      password: hashedPassword4,
      role: 'USER',
      telephone: '47997635500',
    },
  });

  const user5 = await prisma.user.create({
    data: {
      email: 'ana.pereira@gmail.com',
      firstName: 'Ana',
      lastName: 'Pereira',
      password: hashedPassword5,
      role: 'USER',
      telephone: '47997635501',
    },
  });

  // Muestra los datos creados en consola
  console.log([user1, user2, user3, user4, user5]);
  return [user1, user2, user3, user4, user5];
}

// Ejecuta la función principal y maneja errores/desconexión
main()
  .catch((e) => console.error(e))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
