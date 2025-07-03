# Auth API - NestJS + Prisma

Este proyecto es una API de autenticación y gestión de usuarios construida con [NestJS](https://nestjs.com/) y [Prisma ORM](https://www.prisma.io/), usando PostgreSQL como base de datos.

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [npm](https://www.npmjs.com/) (v9 o superior)
- [PostgreSQL](https://www.postgresql.org/) (o Docker para levantar la base de datos)
- [Git](https://git-scm.com/) (opcional, para clonar el repositorio)

## 1. Crear un nuevo proyecto NestJS (opcional)
Si quieres crear el proyecto desde cero:

```bash
npm i -g @nestjs/cli
nest new auth-api
cd auth-api
```

## 2. Instalar dependencias principales

```bash
npm install @nestjs/common @nestjs/core @nestjs/swagger @nestjs/jwt @nestjs/passport passport passport-jwt reflect-metadata rxjs
npm install @prisma/client
npm install --save-dev prisma
```

## 3. Inicializar Prisma y configurar la base de datos

```bash
npx prisma init
```
Esto creará la carpeta `prisma/` y el archivo `prisma/schema.prisma`.

Edita el archivo `.env` para poner la URL de tu base de datos PostgreSQL, por ejemplo:
```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/mi_basededatos"
```

## 4. Definir el esquema de datos

Edita `prisma/schema.prisma` para definir tus modelos. (Ya está configurado en este proyecto).

## 5. Crear y aplicar migraciones

```bash
npx prisma migrate dev --name init
```
Esto creará las tablas en la base de datos y generará el cliente Prisma.

## 6. (Opcional) Poblar la base de datos con datos de ejemplo

```bash
npx ts-node prisma/seeder.ts
```

## 7. Ejecutar el servidor de desarrollo

```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3000` y la documentación Swagger en `http://localhost:3000/api`.

## 8. Usar Docker (opcional)

Puedes levantar la base de datos y otros servicios usando Docker Compose:

```bash
docker-compose up -d
```

## 9. Estructura del proyecto

- `src/` - Código fuente de la API (módulos, controladores, servicios, DTOs, etc.)
- `prisma/` - Esquema de Prisma, migraciones y seeders
- `test/` - Pruebas end-to-end

## 10. Comandos útiles

- `npx prisma studio` - Interfaz visual para explorar la base de datos
- `npx prisma migrate dev --name nombre` - Crear una nueva migración
- `npx prisma generate` - Regenerar el cliente Prisma
- `npm run start:dev` - Ejecutar el servidor en modo desarrollo

## 11. Notas de seguridad
- **No uses la clave JWT de ejemplo en producción.**
- Implementa hash de contraseñas antes de guardar usuarios en producción.

## Seguridad

- La clave secreta de JWT ahora se configura mediante la variable de entorno `JWT_SECRET`.
- Las contraseñas de los usuarios se almacenan de forma segura usando hash con bcrypt.
- Ejemplo de archivo `.env`:

```
JWT_SECRET=una_clave_secreta_larga_y_unica
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/mi_basededatos"
```

---

¡Listo! Ahora puedes desarrollar y probar la API de autenticación y usuarios con NestJS y Prisma.
