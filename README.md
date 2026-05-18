# GameShelf — Backend

API REST del proyecto GameShelf. Gestiona la autenticación, los usuarios, las listas de juegos, las reseñas y los likes, integrando las APIs externas de RAWG, IGDB y Cloudinary.

---

## Tecnologías

- **Node.js** + **Express**
- **PostgreSQL** + **Sequelize** (ORM)
- **JWT** — autenticación con tokens en cookie httpOnly
- **bcrypt** — hash de contraseñas
- **Cloudinary** + **Multer** — subida y almacenamiento de avatares
- **RAWG API** — catálogo de videojuegos
- **IGDB API** — screenshots y tráilers
- **express-rate-limit** — protección contra fuerza bruta

---

## Requisitos previos

- Node.js 18 o superior
- PostgreSQL en ejecución
- Cuentas y claves de: RAWG, IGDB (Twitch), Cloudinary

---

## Instalación y arranque

```bash
# 1. Instalar dependencias
npm install

# 2. Crear el archivo de variables de entorno
cp .env.example .env
# Edita .env y rellena los valores

# 3. Arrancar en modo desarrollo
npm run dev

# O en modo producción
npm start
```

El servidor estará disponible en `https://gameshelf-backend-un3y.onrender.com`

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos
DATABASE_URL=postgresql://usuario:contraseña@host:5432/nombre_bd

# Autenticación
JWT_SECRET=tu_clave_secreta

# RAWG API
RAWG_API_KEY=tu_clave_rawg

# IGDB / Twitch
IGDB_CLIENT_ID=tu_client_id
IGDB_CLIENT_SECRET=tu_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Frontend (CORS)
FRONTEND_URL=https://chimerical-parfait-978ea0.netlify.app
```

---

## Estructura del proyecto

```
src/
├── config/
│   ├── cloudinary.js    # Configuración de Cloudinary y Multer
│   ├── database.js      # Conexión a PostgreSQL con Sequelize
│   └── igdb.js          # Gestión del token de IGDB
├── controllers/
│   ├── authController.js      # Login, register, logout, me
│   ├── gameController.js      # Juegos aleatorios, búsqueda, detalle
│   ├── gameListController.js  # Lista de juegos del usuario
│   ├── likeController.js      # Likes en reseñas
│   ├── reviewController.js    # CRUD de reseñas
│   └── userController.js      # Gestión de usuarios
├── middleware/
│   └── authMiddleware.js      # Verificación de token JWT
├── Models/
│   ├── index.js         # Relaciones entre modelos
│   ├── GameList.js      # Modelo de lista de juegos
│   ├── Like.js          # Modelo de like
│   ├── Review.js        # Modelo de reseña
│   └── User.js          # Modelo de usuario
├── routes/
│   ├── authRoutes.js        # /auth
│   ├── gameListRoutes.js    # /gamelist
│   ├── gameRoutes.js        # /games
│   ├── likeRoutes.js        # /likes
│   ├── reviewRoutes.js      # /reviews
│   └── userRoutes.js        # /users
├── utils/
│   └── jwt.js           # Generación de tokens JWT
└── app.js               # Configuración de Express y arranque
```

---

## Endpoints de la API

### Autenticación `/auth`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/auth/register` | Registrar usuario | No |
| POST | `/auth/login` | Iniciar sesión | No |
| GET | `/auth/me` | Obtener usuario autenticado | Sí |
| POST | `/auth/logout` | Cerrar sesión | Sí |

### Usuarios `/users`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/users` | Obtener todos los usuarios | No |
| GET | `/users/:id` | Obtener usuario por id | No |
| PUT | `/users/:id` | Actualizar usuario (avatar, bio) | No |

### Juegos `/games`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/games` | Obtener juegos aleatorios | No |
| GET | `/games/search?query=` | Buscar juegos | No |
| GET | `/games/:id` | Detalle de juego (RAWG + IGDB) | No |

### Lista de juegos `/gamelist`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/gamelist/:userId` | Obtener lista de un usuario | No |
| POST | `/gamelist` | Añadir juego a la lista | Sí |
| DELETE | `/gamelist/:rawgId` | Eliminar juego de la lista | Sí |

### Reseñas `/reviews`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/reviews/game/:rawgId` | Reseñas de un juego | No |
| GET | `/reviews/user/:userId` | Reseñas de un usuario | No |
| POST | `/reviews` | Crear reseña | Sí |
| PUT | `/reviews/:id` | Actualizar reseña | Sí |
| DELETE | `/reviews/:id` | Eliminar reseña | Sí |

### Likes `/likes`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/likes/:reviewId` | Likes de una reseña | No |
| POST | `/likes` | Dar like | Sí |
| DELETE | `/likes/:reviewId` | Quitar like | Sí |

---

## Modelos y relaciones

```
User ──< GameList
User ──< Review
User ──< Like
Review ──< Like
```

- Un usuario puede tener muchos juegos en su lista, muchas reseñas y muchos likes
- Una reseña puede tener muchos likes
- Los índices únicos compuestos evitan duplicados: un usuario no puede añadir el mismo juego dos veces, ni reseñarlo dos veces, ni dar like dos veces a la misma reseña

---

## Seguridad

- Las contraseñas se hashean con **bcrypt** (salt 10)
- La autenticación usa **JWT** en cookie **httpOnly** (no accesible desde JavaScript)
- Las rutas protegidas usan el middleware `verifyToken`
- Las rutas de autenticación tienen **rate limiting** (300 intentos cada 5 minutos)
- Los mensajes de error de login son genéricos a propósito para no revelar si un email existe

---

## Creadores

- [Elena Gonzalez](https://github.com/Elegm92)
- [Karina Rojas](https://github.com/KarinaRojasDev)