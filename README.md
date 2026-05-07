# 🏠 Real Estate API

REST API para gestión de propiedades inmobiliarias construida con Node.js, Express, TypeScript y Prisma.

## Stack Tecnológico

- **Runtime:** Node.js
- **Lenguaje:** TypeScript
- **Framework:** Express 5
- **ORM:** Prisma 7
- **Base de datos:** PostgreSQL (Supabase)
- **Autenticación:** JWT (jsonwebtoken)
- **Validación:** Zod v4
- **Seguridad:** Helmet, CORS, bcryptjs

---

## ⚙️ Setup

### 1. Clonar el repositorio

```bash
git clone https://github.com/JuanPyC/PracticaBackend.git
cd PracticaBackend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y completa los valores:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta_aqui
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"
```

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (default: 3000) |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT |
| `DATABASE_URL` | URL de conexión con pooler (puerto 6543) |
| `DIRECT_URL` | URL de conexión directa para migraciones (puerto 5432) |

> **Tip:** Genera un `JWT_SECRET` seguro con: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 4. Ejecutar migraciones

```bash
npx prisma migrate dev --name init_database
```

### 5. Insertar datos de prueba (Seed)

```bash
npx prisma db seed
```

Esto crea:
- Usuario admin: `admin@test.com` / `123456`
- 5 propiedades en Medellín, Colombia

### 6. Iniciar el servidor

**Desarrollo:**
```bash
npm run dev
```

**Producción:**
```bash
npm run build
npm start
```

---

## 📡 Endpoints

### Health Check

```
GET /api/v1/health
```

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/v1/auth/login` | Obtener token JWT |

### Propiedades

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/v1/properties` | ❌ | Listar propiedades (con filtros y paginación) |
| GET | `/api/v1/properties/:id` | ❌ | Obtener una propiedad por ID |
| POST | `/api/v1/properties` | 🔒 | Crear una propiedad |
| PUT | `/api/v1/properties/:id` | 🔒 | Actualizar una propiedad |
| DELETE | `/api/v1/properties/:id` | 🔒 | Eliminar una propiedad |

---

## 🔑 Cómo Obtener el Token

**1. Hacer login:**

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "123456"
}
```

**2. Respuesta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**3. Usar el token en peticiones protegidas:**

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📋 Ejemplos

### Crear una propiedad

```http
POST /api/v1/properties
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "title": "Apartamento en El Poblado",
  "price": 350000000,
  "location": "El Poblado, Medellín",
  "available": true
}
```

**Respuesta (201):**

```json
{
  "id": 1,
  "title": "Apartamento en El Poblado",
  "price": "350000000",
  "location": "El Poblado, Medellín",
  "available": true,
  "createdAt": "2026-05-07T07:00:00.000Z"
}
```

### Listar con filtros y paginación

```http
GET /api/v1/properties?location=Medellín&minPrice=200000000&maxPrice=500000000&available=true&page=1&limit=5
```

**Respuesta (200):**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Apartamento de Lujo en El Poblado",
      "price": "450000000",
      "location": "El Poblado, Medellín",
      "available": true,
      "createdAt": "2026-05-07T07:00:00.000Z"
    }
  ],
  "total": 3,
  "page": 1,
  "limit": 5
}
```

**Query Params disponibles:**

| Parámetro | Tipo | Descripción |
|---|---|---|
| `location` | string | Filtro parcial por ubicación (case-insensitive) |
| `minPrice` | number | Precio mínimo |
| `maxPrice` | number | Precio máximo |
| `available` | boolean | Filtro por disponibilidad (`true` / `false`) |
| `page` | number | Página (default: 1) |
| `limit` | number | Resultados por página (default: 10) |

### Actualizar una propiedad

```http
PUT /api/v1/properties/1
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "price": 400000000,
  "available": false
}
```

### Eliminar una propiedad

```http
DELETE /api/v1/properties/1
Authorization: Bearer TOKEN
```

### Error de validación (400)

Si envías datos inválidos:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "path": ["body", "title"],
      "message": "title is required"
    },
    {
      "path": ["body", "price"],
      "message": "price must be a number"
    }
  ]
}
```

---

## 🏗️ Decisiones Técnicas

### Supabase

Se utiliza Supabase como base de datos en la nube (PostgreSQL gestionado) en lugar de una base de datos local por varias razones:

- **Disponibilidad:** La base de datos está siempre activa en internet, sin necesidad de configurar nada en tu propia computadora.
- **Facilidad de uso:** Provee un panel de control visual para ver y editar los datos fácilmente.
- **Preparado para escalar:** Si el proyecto crece, es mucho más sencillo gestionar una base de datos profesional en la nube que una local.

### Prisma

Se eligió Prisma como ORM (Object-Relational Mapping) porque funciona como un puente entre el código y la base de datos. En lugar de escribir consultas SQL complejas, permite interactuar con los datos usando código TypeScript de forma sencilla. Sus principales ventajas son:

- **Seguridad de tipos:** Evita errores al escribir nombres de tablas o campos incorrectos.
- **Autocompletado:** El editor de código sugiere los campos disponibles en cada tabla.
- **Migraciones:** Facilita la actualización de la estructura de la base de datos sin perder datos.

### Zod

Zod se utiliza para validar que la información que llega a la API sea correcta antes de procesarla. Funciona como un "filtro de seguridad" que asegura:

- **Formato correcto:** Que los correos tengan forma de email, los precios sean números, etc.
- **Campos obligatorios:** Garantiza que no falte información crítica en las peticiones.
- **Limpieza de datos:** Elimina campos innecesarios y transforma valores (como convertir texto a números automáticamente).

### Arquitectura del Proyecto
El proyecto sigue una arquitectura simplificada en capas:

```
src/
├── config/          # Variables de entorno tipadas
├── controllers/     # Manejo de request/response
├── db/              # Conexión a base de datos (PrismaClient)
├── middlewares/     # Auth JWT y validación Zod
├── routes/          # Definición de rutas y aplicación de middlewares
├── schemas/         # Esquemas de validación Zod
└── services/        # Lógica de negocio y queries a BD
```

Cada capa tiene una responsabilidad única: los **controllers** orquestan, los **services** contienen la lógica de negocio y acceso a datos, los **schemas** definen las reglas de validación, y los **middlewares** interceptan las peticiones antes de llegar al controller.

---

## Scripts

| Script | Comando | Descripción |
|---|---|---|
| `dev` | `npm run dev` | Servidor en desarrollo con hot-reload |
| `build` | `npm run build` | Compilar TypeScript a JavaScript |
| `start` | `npm start` | Ejecutar build de producción |
