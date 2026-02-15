# Descrición del Proyecto

## Correr en dev

1. Clonar el repositorio
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```
2. Configurar variables de entorno
   ```bash
   Crear una copia del archivo `.env.template` y renombrarla a `.env`, luego ajustar las variables según sea necesario.
   ```
3. Instalar dependencias
   ```bash
   npm install
   ```
4. Levantar la base de datos (si aplica)
   ```bash
   docker compose up -d
   ```
5. Ejecutar seeders iniciales (si aplica)
   ```bash
   npm run seed
   ```
6. Ejecutar migraciones e insertar datos iniciales Prisma (si aplica)
   ```bash
   npx prisma migrate dev
   npm run seed
   ```
7. Correr el servidor de desarrollo
   ```bash
   npm run dev
   ```

## Correr en producción