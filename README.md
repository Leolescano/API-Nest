# Auth API - NestJS + Prisma

Este proyecto es una API de autenticación y gestión de usuarios construida con [NestJS](https://nestjs.com/) y [Prisma ORM](https://www.prisma.io/), usando PostgreSQL como base de datos.

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [npm](https://www.npmjs.com/) (v9 o superior)
- [PostgreSQL](https://www.postgresql.org/) (o Docker para levantar la base de datos)
- [Git](https://git-scm.com/) (opcional, para clonar el repositorio)

## Instalación y configuración rápida

1. Clona el repositorio y entra en la carpeta del proyecto:

```bash
 git clone <URL_DE_TU_REPO>
 cd auth-api
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:

Crea un archivo `.env` en la raíz del proyecto y agrega:

```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/mi_basededatos"
JWT_SECRET=una_clave_secreta_larga_y_unica
PORT=3000
```

4. Aplica las migraciones y genera el cliente Prisma:

```bash
npx prisma migrate dev --name init
```

5. (Opcional) Pobla la base de datos con datos de ejemplo:

```bash
npx ts-node prisma/seeder.ts
```

6. Ejecuta el servidor de desarrollo:

```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3000` y la documentación Swagger en `http://localhost:3000/api`.

---

## Modelos principales

### User
- `id`: UUID
- `email`: string (único)
- `telephone`: string (opcional)
- `firstName`: string
- `lastName`: string (opcional)
- `password`: string (hasheada)
- `role`: `USER` | `ADMIN` (por defecto: USER)
- `address`: string (opcional)
- `createdAt`, `updatedAt`: timestamps

### Roles
- `USER`: Puede ver, actualizar y eliminar solo su propio usuario.
- `ADMIN`: Puede listar todos los usuarios, ver cualquier usuario, cambiar el rol de cualquier usuario y eliminar usuarios con rol USER (no puede eliminar otros ADMIN).

---

## Endpoints principales

### Autenticación
- `POST /auth/login`: Login de usuario. Devuelve un JWT.

### Usuarios
- `POST /users`: Crear un nuevo usuario (registro).
- `GET /users`: Listar todos los usuarios (**solo ADMIN**).
- `GET /users/:id`: Obtener un usuario por ID (**solo ADMIN**).
- `PATCH /users/me`: Actualizar tus propios datos (usuario autenticado).
- `DELETE /users/me`: Eliminar tu propio usuario (usuario autenticado).
- `PATCH /users/:id`: Cambiar el rol de cualquier usuario (**solo ADMIN**, solo acepta `{ "role": "USER" | "ADMIN" }`).
- `DELETE /users/:id`: Eliminar un usuario por ID (**solo ADMIN**, solo si el usuario tiene rol USER).

---

## Seguridad y buenas prácticas

- Las contraseñas se almacenan hasheadas con bcrypt.
- El token JWT tiene una validez de 20 minutos (configurable).
- El campo `role` solo puede ser cambiado por un ADMIN.
- Un ADMIN no puede eliminar a otro ADMIN.
- El usuario autenticado solo puede modificar o eliminar su propio usuario.

---

## Ejemplo de archivo `.env`

```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/mi_basededatos
JWT_SECRET=una_clave_secreta_larga_y_unica
PORT=3000
```

---

## Comandos útiles

- `npx prisma studio` - Interfaz visual para explorar la base de datos
- `npx prisma migrate dev --name nombre` - Crear una nueva migración
- `npx prisma generate` - Regenerar el cliente Prisma
- `npm run start:dev` - Ejecutar el servidor en modo desarrollo

---

## Notas
- No subas tu archivo `.env` real al repositorio.
- Usa la documentación Swagger para probar los endpoints y ver los detalles de cada ruta y sus permisos.

---

¡Listo! Ahora tienes una API de autenticación y gestión de usuarios robusta, segura y bien documentada con NestJS y Prisma.
